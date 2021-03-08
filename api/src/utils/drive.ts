import { readFileSync } from "fs";
import { Auth, drive_v3, google } from "googleapis";

var jwtClient: Auth.JWT;
var drive: drive_v3.Drive;
const videractFolderId = "1VXFQN7a4vOR2mydNMS4m1PQxyC1sAGzw";

export const authenticate = async () => {
    const { apiAccount } = JSON.parse(readFileSync("credentials.json").toString());

    jwtClient = new Auth.JWT(
        apiAccount.client_email,
        undefined,
        apiAccount.private_key,
        ["https://www.googleapis.com/auth/drive"]
    )

    jwtClient.authorize((err, tokens) => {
        if (err) {
            console.log(err);
            return;
        } else {
            console.log("Connected to drive");
        }
    });

    drive = google.drive({ version: "v3", auth: jwtClient});
};



export const addDoc = async (name: string) => {
    const file = await drive.files.create({
        requestBody: {
            name: name,
            mimeType: "application/vnd.google-apps.document",
            parents: [
                "1VXFQN7a4vOR2mydNMS4m1PQxyC1sAGzw"
            ]
        }
    });
    return file.data.id;
};

export const removeDoc = async (id: string) => {
    drive.files.delete({
        fileId: id
    });
}



export const deleteAll = () => { 
    drive.files.list({
        q: "mimeType='application/vnd.google-apps.folder'",
        includeItemsFromAllDrives: true,
        supportsAllDrives: true,
        corpora: "drive",
        driveId: videractFolderId,
        pageSize: 30,
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
// export const generateNewDocId = async ():Promise<string | undefined> => {
//     const response = await drive.files.generateIds({
//         count: 1,
//     });
//     if (response && response.data && response.data.ids) {
//         return response.data.ids[0]
//     }
// };