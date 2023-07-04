const core = require('@actions/core')
const exec = require('@actions/exec')
const tc = require('@actions/tool-cache')
const options ={};

async function setup(){
    try{
        await exec.exec('npm',['install','-g','surge'],{ignoreReturnCode:true})
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

        if(domain === '_'){
            await exec.exec('surge',[`${path}`,`${domain}`],options)
        }
        await exec.exec('surge',[`${path}`,'--domain',`${domain}`],options)
        core.setOutput('domain',output)
    }
    catch(err){
        core.setFailed(err.message)
    }
}

run()

