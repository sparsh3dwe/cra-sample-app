const AWS = require('aws-sdk');
AWS.config.update({
    region: 'ap-south-1'
});
const docClient = new AWS.DynamoDB.DocumentClient();
const snsPublisher = new AWS.SNS();

async function createItem(params) {
    try {
        await docClient.put(params).promise();
    }
    catch (err) {
        return err;
    }
}

async function publishMessage(msgParams) {
    var sent = false;
    try {
        await snsPublisher.publish(msgParams, function(err, data) {
            console.log("Sending sns");
            if (err) {
                console.log("There's an error");
                console.log(err, err.stack); // an error occurred
            }
            else {
                sent = true;
            }
        }).promise();

    }
    catch (err) {
        console.log(err);
    }
    return sent;
}

exports.handler = async (event, context) => {

    const params = {
        TableName: 'lambdaTable',
        /* Item properties will depend on your application concerns */
        Item: event
    }
    await createItem(params);
    var msgSent = false;
    console.log(event.sensors);
    if (event.sensors.indexOf("THERMAL") > -1) {
        var msgParams = {
            Message: "Contains THERMAL",
            MessageStructure: "string",
            Subject: "Test SNS From Lambda",
            TopicArn: "arn:aws:sns:ap-south-1:099447307346:lambda_sns",
        };

        msgSent = await publishMessage(msgParams);
    }

    const response = {
        statusCode: 200,
        body: JSON.stringify(msgSent),
    };
    return response;
};
