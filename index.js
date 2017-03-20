/* eslint-disable  func-names */
/* eslint quote-props: ["error", "consistent"]*/
/**
 * This sample demonstrates a simple skill built with the Amazon Alexa Skills
 * nodejs skill development kit.
 * This sample supports multiple lauguages. (en-US, en-GB, de-DE).
 * The Intent Schema, Custom Slots and Sample Utterances for this skill, as well
 * as testing instructions are located at https://github.com/alexa/skill-sample-nodejs-fact
 **/

'use strict';

var VoiceLabs = require("voicelabs")('fe2d52c0-0cd5-11a7-01de-0eb19d13e26e');

const Alexa = require('alexa-sdk');

const APP_ID = 'amzn1.ask.skill.e418faa7-c30e-46e4-946b-b7ded9beb622';  // TODO replace with your app ID (OPTIONAL).

const languageStrings = {
    'en-GB': {
        translation: {
            FACTS: [
                'The Chicago Browns was a professional baseball team playing in the Union Association in 1884.',
                'South Side Park was an early baseball stadium originally on the corner of 39th Street and South Wabash Avenue.',
                'The first cross town World Series was played in Chicago in 1906 between the Cubs and White Sox.',
                'The Chicago American Giants was a Negro league team started in 1910.',
                'Rube Foster was a baseball pioneer, and known as the father of Black baseball. He was elected to the National Baseball Hall of Fame in 1981.',
                'Charles Comiskey was the founding owner of the Chicago White Sox, and was born in Chicago in 1859.',
                'Comiskey Park was built in 1910, and originally named White Sox Park. It hosted more than six thousand major league games before being replaced in 1991.',
                'The Chicago White Stockings are one of eight charter teams of the American League founded in 1901.',
                'Disco Demolition Night was a baseball promotion held on July 12, 1979 at Comiskey Park where more than fifty thousand fans attended due to a promotion by a local radio station WLUP where admittance cost on 98 cents if you brought a disco record to blow up between games of the doubleheader. Due to damage on the field, the second game was cancelled, and the White Sox were required to forfeit.',
                'Hall of Fame broadcaster Harry Caray broadcast the White Sox games from 1971 to 1981, and the Cubs games from 1982 to 1997.',
                'The Chicago Cubs are a founding member of the National League dating back to 1876. They were originally named the Chicago White Stockings, and became the Cubs in 1903.',
                'The original baseball stadium for the Chicago Cubs was the 23rd Street Grounds.',
                'Wrigley Field opened in 1914 and was originally named Weeghman Park in honor of Charles Weeghman.',
                'The Chicago Whales were a professional baseball team in the Federal League, and played for two seasons in 1914 and 1915.',
                'Bill Wrigley who also founded the chewing gum company obtained majority interest of the Cubs in 1921. His family controlled the team until 1981.',
                'The iconic center field scoreboard at Wrigley Field was installed in 1937. No player has ever hit a ball to the current scoreboard in eighty years.',
                'Softball was conceived in Chicago, with the first game played in 1887 on Thanksgiving Day.',
                '16 inch softball remains popular in Chicago, and is also referred to as Mushball. It is played with no mitts or gloves on the fielders.',
            ],
            SKILL_NAME: 'Chicago Baseball Facts',
            GET_FACT_MESSAGE: "Here's your fact: ",
            HELP_MESSAGE: 'You can say tell me a baseball fact, or, you can say exit... What can I help you with?',
            HELP_REPROMPT: 'What can I help you with?',
            STOP_MESSAGE: 'Goodbye!',
        },
    },
    'en-US': {
        translation: {
            FACTS: [
                'The Chicago Browns was a professional baseball team playing in the Union Association in 1884.',
                'South Side Park was an early baseball stadium originally on the corner of 39th Street and South Wabash Avenue.',
                'The first cross town World Series was played in Chicago in 1906 between the Cubs and White Sox.',
                'The Chicago American Giants was a Negro league team started in 1910.',
                'Rube Foster was a baseball pioneer, and known as the father of Black baseball. He was elected to the National Baseball Hall of Fame in 1981.',
                'Charles Comiskey was the founding owner of the Chicago White Sox, and was born in Chicago in 1859.',
                'Comiskey Park was built in 1910, and originally named White Sox Park. It hosted more than six thousand major league games before being replaced in 1991.',
                'The Chicago White Stockings are one of eight charter teams of the American League founded in 1901.',
                'Disco Demolition Night was a baseball promotion held on July 12, 1979 at Comiskey Park where more than fifty thousand fans attended due to a promotion by a local radio station WLUP where admittance cost on 98 cents if you brought a disco record to blow up between games of the doubleheader. Due to damage on the field, the second game was cancelled, and the White Sox were required to forfeit.',
                'Hall of Fame broadcaster Harry Caray broadcast the White Sox games from 1971 to 1981, and the Cubs games from 1982 to 1997.',
                'The Chicago Cubs are a founding member of the National League dating back to 1876. They were originally named the Chicago White Stockings, and became the Cubs in 1903.',
                'The original baseball stadium for the Chicago Cubs was the 23rd Street Grounds.',
                'Wrigley Field opened in 1914 and was originally named Weeghman Park in honor of Charles Weeghman.',
                'The Chicago Whales were a professional baseball team in the Federal League, and played for two seasons in 1914 and 1915.',
                'Bill Wrigley who also founded the chewing gum company obtained majority interest of the Cubs in 1921. His family controlled the team until 1981.',
                'The iconic center field scoreboard at Wrigley Field was installed in 1937. No player has ever hit a ball to the current scoreboard in eighty years.',
                'Softball was conceived in Chicago, with the first game played in 1887 on Thanksgiving Day.',
                '16 inch softball remains popular in Chicago, and is also referred to as Mushball. It is played with no mitts or gloves on the fielders.',
            ],
            SKILL_NAME: 'Chicago Baseball Facts',
            GET_FACT_MESSAGE: "Here's your fact: ",
            HELP_MESSAGE: 'You can say tell me a baseball fact, or, you can say exit... What can I help you with?',
            HELP_REPROMPT: 'What can I help you with?',
            STOP_MESSAGE: 'Goodbye!',
        },
    },
};

const handlers = {
    'LaunchRequest': function () {
        this.emit('GetFact');
    },
    'GetNewFactIntent': function () {
        this.emit('GetFact');
    },
    'GetFact': function () {
        // Get a random space fact from the space facts list
        // Use this.t() to get corresponding language data
        const factArr = this.t('FACTS');
        const factIndex = Math.floor(Math.random() * factArr.length);
        const randomFact = factArr[factIndex];

        // Create speech output
        const speechOutput = this.t('GET_FACT_MESSAGE') + randomFact;

	VoiceLabs.track(this.event.session, 'QuoteFact', null, speechOutput, (error, response) => {
            this.emit(':tellWithCard', speechOutput, this.t('SKILL_NAME'), randomFact);
	});
    },
    'AMAZON.HelpIntent': function () {
        const speechOutput = this.t('HELP_MESSAGE');
        const reprompt = this.t('HELP_MESSAGE');
        this.emit(':ask', speechOutput, reprompt);
    },
    'AMAZON.CancelIntent': function () {
        this.emit(':tell', this.t('STOP_MESSAGE'));
    },
    'AMAZON.StopIntent': function () {
        this.emit(':tell', this.t('STOP_MESSAGE'));
    },
    'SessionEndedRequest': function () {
        this.emit(':tell', this.t('STOP_MESSAGE'));
    },
};

exports.handler = (event, context) => {
    const alexa = Alexa.handler(event, context);
    alexa.appId = APP_ID;
    // To enable string internationalization (i18n) features, set a resources object.
    alexa.resources = languageStrings;
    alexa.registerHandlers(handlers);
    alexa.execute();
};

