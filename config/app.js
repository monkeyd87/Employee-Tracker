
const inquirer = require('inquirer')
const { Database } = require('sqlite3')

// const db = require("./connection")

const prompt = inquirer.createPromptModule()
const DB =require('./db.js')
const dataBase = new DB()

console.log(`
_______  __   __  _______  ___      _______  __   __  _______  _______ 
|       ||  |_|  ||       ||   |    |       ||  | |  ||       ||       |
|    ___||       ||    _  ||   |    |   _   ||  |_|  ||    ___||    ___|
|   |___ |       ||   |_| ||   |    |  | |  ||       ||   |___ |   |___ 
|    ___||       ||    ___||   |___ |  |_|  ||_     _||    ___||    ___|
|   |___ | ||_|| ||   |    |       ||       |  |   |  |   |___ |   |___ 
|_______||_|   |_||___|    |_______||_______|  |___|  |_______||_______|
__   __  _______  __    _  _______  _______  _______  ______           
|  |_|  ||   _   ||  |  | ||   _   ||       ||       ||    _ |          
|       ||  |_|  ||   |_| ||  |_|  ||    ___||    ___||   | ||          
|       ||       ||       ||       ||   | __ |   |___ |   |_||_         
|       ||       ||  _    ||       ||   ||  ||    ___||    __  |        
| ||_|| ||   _   || | |   ||   _   ||   |_| ||   |___ |   |  | |        
|_|   |_||__| |__||_|  |__||__| |__||_______||_______||___|  |_|        
`)
async function emplpoyeeManager(x){

   const{option}= await prompt([
        {
            type:'list',
            name: 'option',
            message:'What would you like to do?',
            choices:[
                'View all Employees',
                'view all roles',
                'view all department',
                'add employee',
                'add department',
                'add role',
                'update employees role',
                'exit'
            ]
        }
        
        
    ])
    

    function resolve(option){

        switch(option){
            case 'View all Employees':
                dataBase.viewAllEmployees(emplpoyeeManager)

               
                break;
            case 'view all roles':
                dataBase.viewAllRoles(emplpoyeeManager)
                break;
            case 'view all department':
                dataBase.viewAllDepartments(emplpoyeeManager)
                
                break;
    
            case 'add employee':
                dataBase.addEmployee(emplpoyeeManager)
                
                break;
            
            case 'add department':
                dataBase.addDepartment(emplpoyeeManager)
                
                break;
    
            case 'add role':
                dataBase.addRole(emplpoyeeManager)
                
                break;
    
            case 'update employees role':
                dataBase.UpdateEmployeeRole(emplpoyeeManager)
                
                break;
            
            case 'exit':
                dataBase.db.end()
                return
                break;
        
    
            
        }
        x=true
        return x
    }
    resolve(option)
   
    
}

emplpoyeeManager()
