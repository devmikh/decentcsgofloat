const SteamUser = require('steam-user');
const GlobalOffensive = require('globaloffensive');
const client = new SteamUser({ webCompatibilityMode: true});
const csgo = new GlobalOffensive(client);
const dotenv = require('dotenv');
dotenv.config();

// Example skin inspect link
const inspectLink = 'steam://rungame/730/76561202255233023/+csgo_econ_action_preview%20S76561198029950371A29358166711D12009462091753638643'

// Login to steam using JWT
client.logOn({
    refreshToken: process.env.STEAM_REFRESH_TOKEN,
});

client.on('loggedOn', function(details) {
    console.log("Logged into Steam as " + client.steamID.getSteam3RenderedID());

    // Set client status to online
    client.setPersona(SteamUser.EPersonaState.Online);

    // Launch CSGO
    client.gamesPlayed([730]);

    // Inspect item after 5 seconds (after GC is connected)
    setTimeout(() => {
            csgo.inspectItem(inspectLink, (item) => {
                console.log(item);
            }
        );
    }, 5000);
});

client.on('error', function(e) {
    console.log(e);
});