// Files are stored in s3 with the following schema:
// <bucket>/<user-id>/<document-name>

import S3 from 'aws-sdk/clients/s3';
import { get, post } from './axios-wrapper';

const documentBucket = 'purple-rain-documents'
const documentBucketUrl = `https://${documentBucket}.s3.amazonaws.com`
const s3 = new S3({ apiVersion: '2006-03-01' });

// Get a specific document for a user
export const getDocument = async (userId: string, documentName: string) => {
    const object = await get(`${documentBucketUrl}/${userId}/${documentName}`);
    return object;
};

// Adding will overwrite any existing document
export const addDocument = async (userId: string, documentName: string, content: any) => {
    let body = new FormData()
    console.log("Here")
    body.append("key", s3DocumentKey(userId, documentName))
    body.append("file", content);
    return await post(documentBucketUrl, body, { headers: { 'Content-Type': 'multipart/form-data' } });
};

const s3DocumentKey = (userId: string, documentName: string) => `${userId}/${documentName}`;