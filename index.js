const core = require('@actions/core')
const exec = require('@actions/exec')
const tc = require('@actions/tool-cache')
const options ={};

async function setup(){
        const surgeDir = tc.find('surge','0.19.0')
        if(typeof surgeDir === 'string'){
            core.addPath(surgeDir)
        }
        else{
            const surgePath = await tc.downloadTool('https://github.com/sintaxi/surge/archive/refs/tags/v0.19.0.zip')
            const surgeExtractedFolder = await tc.extractZip(surgePath, '~/sg')
            const surgeCacheDir = await tc.cacheDir(surgeExtractedFolder,'surge','0.19.0')
            core.addPath(surgeCacheDir)
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

