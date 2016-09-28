var restify = require('restify');
var builder = require('botbuilder');

//=========================================================
// Bot Setup
//=========================================================

// Setup Restify Server
var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function () {
   console.log('%s listening to %s', server.name, server.url); 
});
  
// Create chat bot
var connector = new builder.ChatConnector({
    appId: process.env.MICROSOFT_APP_ID,
    appPassword: process.env.MICROSOFT_APP_PASSWORD
});

var bot = new builder.UniversalBot(connector, { persistConversationData: true });
server.post('/api/messages', connector.listen());

//=========================================================
// Bots Dialogs
//=========================================================

bot.dialog('/', function (session) {
    if(session.message.text.indexOf("hello") !== -1 || session.message.text.indexOf("hi") !== -1){
        session.beginDialog("/welcome");
    }
    else if(session.message.text.indexOf("i want info about a pokemon") !== -1){
        session.beginDialog("/getPokemonInfo");
    }
    else if(session.message.text.indexOf("what is its type?") !== -1){
        session.beginDialog("/getPokemonType");
    }
    else {
        session.send("I did not understood your question.");
    }
});

bot.dialog('/welcome', function (session) {
    session.send("Hello, I am the Simple Pokebot! You can ask me information about pokemons. For instance, say '*i want info about a pokemon*'");
    session.endDialog();
});

bot.dialog('/getPokemonInfo', [
    function (session) {
        builder.Prompts.text(session, "Which one?");
    },
    function (session, results) {
        session.conversationData.currentPokemon = results.response;
        var pokemonInfo = getPokemonInfo(results.response);
       
        session.send("Ok. here is what I know:");
        session.send(pokemonInfo);
        session.endDialog();
    }
]);

bot.dialog('/getPokemonType', [
    function (session) {
        if(session.conversationData.currentPokemon){
            var pokemonType = getPokemonType(session.conversationData.currentPokemon);
            session.send("Ok. I think it is...");
            session.send(pokemonType);
            session.endDialog();
        }
        else{
            builder.Prompts.text(session, "Which one?");
        }
    },
    function (session, results) {
        session.conversationData.currentPokemon = results.response;
        var pokemonType = "I don't know...";
        
        session.send("Ok. I think it is...");
        session.send(pokemonType);
        session.endDialog();
    }
]);

//HELPERS
var getPokemonInfo = function(pokemonName){
    var pokemonInfo = "";
    switch(pokemonName){
        case "pikachu":
            pokemonInfo = "Whenever Pikachu comes across something new, it blasts it with a jolt of electricity. If you come across a blackened berry, it's evidence that this Pokémon mistook the intensity of its charge.";
            break;
        case "bulbasaur":
            pokemonInfo = "Bulbasaur can be seen napping in bright sunlight. There is a seed on its back. By soaking up the sun's rays, the seed grows progressively larger.";
            break;
        case "charmeleon":
            pokemonInfo = "Charmeleon mercilessly destroys its foes using its sharp claws. If it encounters a strong foe, it turns aggressive. In this excited state, the flame at the tip of its tail flares with a bluish white color.";
            break;
        default:
            pokemonInfo = "Nothing ... :("
    }

    return pokemonInfo;
}

var getPokemonType = function(pokemonName){
    var pokemonInfo = "";
    switch(pokemonName){
        case "pikachu":
            pokemonInfo = "electric";
            break;
        case "bulbasaur":
            pokemonInfo = "grass and poison";
            break;
        case "charmeleon":
            pokemonInfo = "fire";
            break;
        default:
            pokemonInfo = "Well... I don't know :("
    }

    return pokemonInfo;
}