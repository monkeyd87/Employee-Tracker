

const db = require("./connection")
const inquirer = require('inquirer')

const prompt = inquirer.createPromptModule()

class DB{
    constructor(){
        this.db = db;
    }

    viewAllEmployees(){
        this.db.query('Select * FROM employee',(err,data)=>console.table(data))
    }

    viewAllRoles(){
        this.db.query('Select * FROM role',(err,data)=>console.table(data))
    }
    
    viewAllDepartments(){
        this.db.query('Select * FROM department',(err,data)=>console.table(data))
    }

     async addEmployee(){
        let roles = []
          this.db.query('select id, title from role',async(err,data)=>{
            if(err)throw err
            let roleId;
            const {role} = await prompt([
                {
                    type:'list',
                    name:'role',
                    choices: data.map(role=>role.title),
                    message:'What is the role of the employee.',
                    loop: false
                }
            ])

            for(let roles of data){
                if(roles.title === role){
                    roleId = roles.id
                }
            }

            db.query('SELECT * FROM employee', async(err,res)=>{
                if(err)throw err
                let choices = res.map(res=> `${res.first_name} ${res.last_name.slice(0,1)}.`)
                let {manager} = await prompt([
                    {
                        type:'list',
                        name: 'manager',
                        choices: choices,
                        message: 'Name of manager',
                        loop:false

                    }

                ])
            })

            



        })
        

        

        


    }

}

const database =  new DB()
database.addEmployee()


