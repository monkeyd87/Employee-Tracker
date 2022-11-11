

const db = require("./connection")
const inquirer = require('inquirer')
// const employeeManager = require('./app')

const prompt = inquirer.createPromptModule()

class DB{
    constructor(){
        this.db = db;
    }

    viewAllEmployees(){
        this.db.query(`SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager
        FROM employee
        LEFT JOIN employee manager on manager.id = employee.Managerid
        INNER JOIN role ON (role.id = employee.Roleid)
        INNER JOIN department ON (department.id = role.Departmentid)
        ORDER BY employee.id;`,(err,data)=>err?console.error(err):console.table(data))
    }

    viewAllRoles(){
        this.db.query('Select * FROM role',(err,data)=>console.table(data))
        

    }
    
    viewAllDepartments(){
        this.db.query('Select * FROM department',(err,data)=>console.table(data))
    }

    async addEmployee(){
        let name = await prompt([
            {
                type: 'input',
                name: 'first',
                message: 'What is the First name',
                validate: (data)=> data? true: 'A name must be entered'

            },
            {
                type: 'input',
                name: 'last',
                message: 'What is the Last name',
                validate: (data)=> data? true: 'A name must be entered'

            },
        ])
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

            this.db.query('SELECT * FROM employee', async(err,res)=>{
                if(err)throw err
                let choices = res.map(res=> `${res.first_name} ${res.last_name}`)
                console.log(choices)
                choices.push('none')
                let {manager} = await prompt([
                    {
                        type:'list',
                        name: 'manager',
                        choices: choices,
                        message: 'Name of manager',
                        loop:false

                    }

                ])
            let managerId;
            let managerName;
            if (manager === 'none') {
                managerId = null;
            } else {
                for (const data of res) {
                    data.fullName = `${data.first_name} ${data.last_name}`;
                    if (data.fullName === manager) {
                        managerId = data.id;
                        
                        managerName = data.fullName;
                        console.log(managerId);
                        console.log(managerName);
                        continue;
                    }
                }
            }

            console.log('Employee has been added.');
            this.db.query(
                'INSERT INTO employee SET ?',
                {
                    first_name: name.first,
                    last_name: name.last,
                    Roleid: roleId,
                    Managerid: parseInt(managerId)
                },
                (err, res) => {
                    if (err) throw err;
                    
                    ;

                }
            );
                
                       
    
            })
            
            

            



        })
        
        

        

        


    }
    async addDepartment(){
           let {department} = await prompt({
                type: 'input',
                name: 'department',
                message: 'Name of new Department',
                validator: (res)=> res?true:'MUST ADD A DEPARTMENT NAME'

            })

            this.db.query(`INSERT INTO department SET ?`,{
                name:department
            },async (err,res)=>{
                if(err)throw err
                console.log(err)
            })
    }
    async addRole(){
        const {name,salary} = await prompt(
            [
                {
                    type:'input',
                    name:'name',
                    message:'What is title of the role?',
                    validate:(res)=>res?true:'Must input data!'
                },
                {
                    type:'input',
                    name:'salary',
                    message:'What is the salart of the role?',
                    validate:(res)=>res?true:'Must input data!'

                }
            ])
        
        let departmentId 
        this.db.query('SELECT * FROM department',async(err,res)=>{
            if(err)throw err
           

            const {department}= await prompt(
                {
                    type:'list',
                    name:'department',
                    choices:res.map(data=>data.name),
                    message: 'What department is the role in?'


                }
            )
            for(let data of res){

                if(data.name === department){
                    departmentId = data.id
                }
            }

            
            this.db.query('INSERT INTO role set?',
            {
                title:name,
                salary:parseInt(salary),
                Departmentid:parseInt(departmentId)
    
            },async(err,res)=>{
                if(err)throw err
                console.log('done')
            })
        })


        
    }
    async UpdateEmployeeRole(){
        let employeeId
        let role
        this.db.query('SELECT first_name, last_name, id FROM employee',async(err,res)=>{
            if(err)throw err
            const {name} = await prompt(
                [
                    {
                        type:'list',
                        name:'name',
                        choices: res.map(res=>`${res.first_name} ${res.last_name}`),
                        message:'What is the employee?',
                        
                    }
                ]
                )
                for(let data of res){
                    if(`${data.first_name} ${data.last_name}`=== name){
                        employeeId = data.id

                    }
                }
           
            let roleId
            this.db.query('select title, id from role',async(err,res)=>{
                if(err)throw err
                const {name}= await prompt([
                    {
                        type:'list',
                        choices: res.map(res=>res.title),
                        name:'name',
                        message:'Choose new role?'
                    }
                ])
                for(let data of res){
                    if(data.title=== name){
                        roleId = data.id
                    }
                }
                this.db.query(`UPDATE employee SET Roleid= ${roleId} where id=${employeeId}`,(err,res)=>{
                    if (err) throw err;
            console.log('Role has been updated..')
                })
                
                
            })

            
            
        })


    }

}

const database =  new DB()
database.viewAllEmployees()
// db.end()


