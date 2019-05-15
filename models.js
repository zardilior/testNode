var pool = require('./db.js');
getConnection = pool.getConnection()

var skillsObj = {
    insert: async function(skills,sql){
        // difference of new skills
        console.log(sql)
        existing_skills = await sql.query('select from skills where in ?',skills)
        new_skills = skills.filter((x)=>!existing_skills.included(x))

        // insert new skills
        sql.query('insert into skills(skill) values ?',
            new_skills
        );
    }
}

exports.subscriptions = {
    create : async function(email,skills){
        let sql = null;
        try {
            sql = await getConnection();
            skillsObj.insert(skills,sql);
            console.log(sql); 
            // insert subscription
            let result = sql.query(
                'insert into subscriptions(email) values(?)',
                email
            )
            id_subscription = result.insertId   
            modified_skills = skills.map((x)=>[id_subscription,x])
            result = result && await sql.query(
                'insert into subscriptions_skills(id_subscription,skill) values ?',
                modified_skills
            )
            return result;
        } catch (error) {
            if (conn != null) {
                conn.query('ROLLBACK');
            }
            return 0;
        }
    },
}
exports.employees = {
    getMatching : async function(account){
        // select * from employees that have the skills join
        let sql =  await getConnection();
        var matching = await sql.query(`
            select employees.*,skills.* from employees 
            inner join employees_skills
            on employees.id=employees_skills.id_employee 
            inner join skills 
            on skills.id=employees_skills.id_skill 
            where (select count(*) from 
                employees_skills 
                inner join skills 
                on skills.id=employees_skills.id_skill 
                where skills.id  in (?)
                and where employees_skills.id_employee = employees.id_employee 
            ) > 0 
        `, account)
        return matching;
    },
    create : async function(email,password,skills){
        let sql = null;
        try {
            let sql =  await getConnection();
            console.log(sql)
            skillsObj.insert(skills,sql);

            // insert employee
            await sql.query('insert into employee(email, password) values ?, ?',
                email,
                password,
                // insert relations
                function(err, result){
                    if(err)
                        return 0
                    id_employee = result.insertId   
                    modified_skills = skills.map((x)=>[id_employee,x])
                    sql.query(
                        'insert into employee_skills(id_employee,skill) values ?',
                        modified_skills,
                    )
                    return 1
                }
            )
            sql.release()

        } catch (error) {
            if (sql != null) {
                 sql.query('ROLLBACK');
                sql.release()
            }
            console.log(error)
            return 0;
        }
    }
}
