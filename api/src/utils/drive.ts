
import { json } from "express";
import { readFileSync } from "fs";
import { Auth, drive_v3, google } from "googleapis";

var jwtClient: Auth.JWT;
var drive: drive_v3.Drive;

export const authenticate = async () => {
    const { apiAccount } = JSON.parse(readFileSync("credentials.json").toString());
    
    // const jwtClient = {
    //     email: apiAccount.client_email,
    //     key: apiAccount.private_key,
    //     scope: "https://www.googleapis.com/auth/drive",
    // } as Auth.JWT;

    jwtClient = new Auth.JWT(
        apiAccount.client_email,
        undefined,
        apiAccount.private_key,
        ["https://www.googleapis.com/auth/drive"]
    )


    // await jwtClient.authorize()

    jwtClient.authorize((err, tokens) => {
        if (err) {
            console.log(err);
            return;
        } else {
            console.log("Success");
        }
    });

    drive = google.drive({ version: "v3", auth: jwtClient});
};

export const deleteAll = () => {

    
    drive.files.list({
        pageSize: 10,
        fields: 'nextPageToken, files(id, name)',
    }, (err, res) => {
        if (err) {
            return console.log('The API returned an error: ' + err);
        }
        var files
        files = res?.data.files;
        if (files && files.length) {
            console.log('Files:');
            files.map((file) => {
                console.log(`${file.name} (${file.id})`);
            });
        } else {
            console.log('No files found.');
        }
        
        return files;
    });
};