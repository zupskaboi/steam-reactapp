//Een import dat nodig is om api data te kunnen ontvangen en verwerken.
import type { NextApiRequest, NextApiResponse } from "next";

//Dit is de functie om steam data op te halen van de api link.
//Hiervoor is de steamtoken die ik heb gekregen plus een steam ID nodig om data te laten zien.
export const getPlayerSummaries = () => {
    const playersummaries_endpoint = `http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${process.env.STEAM_TOKEN}&steamids=${process.env.STEAM_ID}`;
    return fetch(playersummaries_endpoint, {
        method: "GET",
    });
};

//Hier word de data opgehaald en kan dan vervolgens specefieke data vragen van de api.
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const response = await getPlayerSummaries();

    //Als de api voor een reden niet werkt, dan komt er bij de status een offline bericht.
    if (response.status != 200) {
        return res.status(200).json({
            steam: {
                personastate: "Offline",
            },
        });
    }

    const steam = await response.json();
    if (steam.item === null) {
        return res.status(200).json({
            steam: {
                personastate: "Offline",
            },
        });
    }
    const getPersonName = steam.response.players[0].personaname;

    const getAvatar = steam.response.players[0].avatarfull;

    //Inplaats dat de app een getal laat zien, word er een string weergeven bij de bij behorende waarde.
    const getStatus =
        steam.response.players[0].personastate === 1
            ? "Online 😆"
            : steam.response.players[0].personastate === 2
                ? "Busy 😐"
                : steam.response.players[0].personastate === 3
                    ? "Away 🥱"
                    : "Offline 😴";

    const getGames = !steam.response.players[0].gameextrainfo
        ? false
        : `Playing - ${steam.response.players[0].gameextrainfo} 😆`;

    const getprofileUrl = steam.response.players[0].profileurl;

    const getCommunityVisibilityState =
        steam.response.players[0].communityvisibilitystate === 1
            ? "Profile is private"
            : steam.response.players[0].communityvisibilitystate === 3
                ? "Profile is public"
                : "Profile doesnt exist or the api isn't working";

    const getUnixLastLogOff = steam.response.players[0].lastlogoff;

    //Dit is een functie om de unix tijd te veranderen in normale tijd.
    let unix_timestamp = getUnixLastLogOff
    var date = new Date(unix_timestamp * 1000);
    var hours = date.getHours();
    var minutes = "0" + date.getMinutes();

    var getLastLogOff = hours + ':' + minutes.substr(-2);

    const getSteamID = steam.response.players[0].steamid;

    const getCommentPermission =
        steam.response.players[0].commentpermission === 1
            ? "Comments aren't allowed on this profile"
            : steam.response.players[0].commentpermission === 2
                ? "Comments are allowed on this profile"
                : "Profile doesnt exist or the api isn't working";

    //Als je deze pagina opent in de browser, laat het een json format zien van data.
    return res.status(200).json({
        steam: {
            getPersonName,
            getAvatar,
            getStatus,
            getGames,
            getprofileUrl,
            getCommunityVisibilityState,
            getLastLogOff,
            getSteamID,
            getCommentPermission,
        },
    });
}