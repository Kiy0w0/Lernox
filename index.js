
//Importing all needed Commands
const Discord = require("discord.js"); //this is the official discord.js wrapper for the Discord Api, which we use!
const colors = require("colors"); //this Package is used, to change the colors of our Console! (optional and doesnt effect performance)
const Enmap = require("enmap"); //this package is our Database! We will use it to save the data for ever!
const fs = require("fs"); //this package is for reading files and getting their inputs
//Creating the Discord.js Client for This Bot with some default settings ;) and with partials, so you can fetch OLD messages
const client = new Discord.Client({
  fetchAllMembers: false,
  restTimeOffset: 0,
  shards: "auto",
  restWsBridgetimeout: 100,
  disableEveryone: true,
  partials: ['MESSAGE', 'CHANNEL', 'REACTION']
});

require('events').EventEmitter.defaultMaxListeners = 100;
process.setMaxListeners(100);

//Loading files, with the client variable like Command Handler, Event Handler, ...
["clientvariables", "command", "events", "erelahandler", "requestreacts"].forEach(handler => {
    require(`./handlers/${handler}`)(client);
});

//Each Database gets a own file and folder which is pretty handy!
client.premium = new Enmap({ name: "premium", dataDir: "./databases/premium" })
client.stats = new Enmap({ name: "stats", dataDir: "./databases/stats" })
client.settings = new Enmap({ name: "setups", dataDir: "./databases/settings" })
client.setups = new Enmap({ name: "setups", dataDir: "./databases/setups" })
client.queuesaves = new Enmap({ name: "queuesaves", dataDir: "./databases/queuesaves", ensureProps: false})
client.modActions = new Enmap({ name: 'actions', dataDir: "./databases/warns" });
client.userProfiles = new Enmap({ name: 'userProfiles', dataDir: "./databases/warns" });


    client.on("shardReady", (shardID) => {
    
        if (shardID === 2){
                const poststats = async () => {
                    const BOATS = require('boats.js');
                    const fetch = require('node-fetch');
                    const shard = require('./sharder.js');
                let guildsCounts = await client.shard.fetchClientValues("guilds.cache.size");
                let guildsCountss = guildsCounts[0] + guildsCounts[1] + guildsCounts[2];
                fetch(`https://infinitybotlist.com/api/bots/577236734245470228/`, {
                    method: "POST",
                    headers: {
                        Authorization: "*****",
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        "servers": guildsCountss,
                        "shards": '10000'
                    })
                })
         }
         poststats();

        }
        const shardlog = new Discord.WebhookClient('YOURID', 'your web token');
        const gay1 = `<a:checklistts:903650095264837703> 
 | Shard #${shardID} is ready!`;
        shardlog.send(gay1);
    });
    client.on("shardReconnecting", (shardID) => {
    const shardlog = new Discord.WebhookClient('YOURID', your web token');
        const gay2 = `<:error:894086602920435712> 
 | Shard #${shardID} is reconnecting...`;
        shardlog.send(gay2);
    });
    client.on("shardResume", (shardID) => {
        const shardlog = new Discord.WebhookClient('YOUR ID', 'your web token');
        const gay3 = `<a:Dot:858567127111696414> | Shard #${shardID} has resumed!`;
        shardlog.send(gay3);
    });
    


//login into the bot
client.login(process.env.TOKEN);


