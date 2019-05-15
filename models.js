var database = require('./db.js');

var skills = {
    insert:function(skills,sql){
        // difference of new skills
        existing_skills = sql.query('select from skills where in(?)',skills)
        new_skills = skills.filter((x)=>!existing_skills.included(x))

        // insert new skills
        sql.query('insert into skills(skill) values ?',
            new_skills
        );
    }
}

exports.subscriptions = {
    create : function(email,skills){
        let sql = null;
        try {
            sql = database.getConnection();

            skills.insert(skills,sql);
            
            // insert subscription
            sql.query('insert into subscriptions(email) values(?)',
                email,
                // create relations
                function(err, result){
                    if(err)
                        return 1
                    id_subscription = result.insertId   
                    modified_skills = skills.map((x)=>[id_subscription,x])
                    sql.query(
                        'insert into subscriptions_skills(id_subscription,skill) values ?',
                        modified_skills,
                    )
                }
            );
        } catch (error) {
            if (conn != null) {
                conn.query('ROLLBACK');
            }
            return 0;
        }
    },
}
exports.employees = {
    getMatching : function(account){
        // select * from employees that have the skills join
        let sql =  database.getConnection();
        sql.query(`
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
        `)
    },
    create : function(email,password,skills){
        let sql = null;
        try {
            let sql =  database.getConnection();

            skills.insert(skills,sql);

            // insert employee
            sql.query('insert into employee(email, password) values ?, ?',
                email,
                password,
                // insert relations
                function(err, result){
                    if(err)
                        return 1
                    id_employee = result.insertId   
                    modified_skills = skills.map((x)=>[id_employee,x])
                    sql.query(
                        'insert into employee_skills(id_employee,skill) values ?',
                        modified_skills,
                    )
                }
            )
            conn.release()

        } catch (error) {
            if (sql != null) {
                 sql.query('ROLLBACK');
                sql.release()
            }
            return 0;
        }
    }
}
