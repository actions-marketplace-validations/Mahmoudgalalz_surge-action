const core = require('@actions/core')
const exec = require('@actions/exec')
const options ={};

async function setup(){
    try{
        await exec.exec('npm i -g surge')
        const token =  core.getInput('auth-token')
        await exec.exec('export',[`SURGE_TOKEN=${token}`])
    }
    catch(err){
        core.setFailed(err.message)
    }
}

async function run(){
    try{
        const domain = core.getInput('domain')
        const path = core.getInput('path')
        await setup();
        
        let output = ''
        let errors = ''

        options.listeners = {
            stdout:(data)=>{
                output+=data.toString()
            },
            stderr:(data)=>{
                errors+=data.toString()
            }
        }
        await exec.exec('surge',[`${path}`,'--domain',`${domain}`],options)
        core.setOutput('domain',output)
    }
    catch(err){
        core.setFailed(err.message)
    }
}

run()

