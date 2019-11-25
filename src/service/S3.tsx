// Files are stored in s3 with the following schema:
// <bucket>/<user-id>/<document-name>

//import S3 from 'aws-sdk/clients/s3';
import { get, post, getNoHeaders, postS3Headers } from './axios-wrapper';

const documentBucket = 'purple-rain-documents'
const documentBucketUrl = `https://${documentBucket}.s3.amazonaws.com`
//const s3 = new S3({ apiVersion: '2006-03-01' });

// Get a specific document for a user
export const getDocument = async (userId: string, propertyId: string, documentName: string) => {
    const object = await getNoHeaders(`${documentBucketUrl}/${userId}-${propertyId}/${documentName}`);
    return object;
};

// Adding will overwrite any existing document
export const addDocument = async (userId: string, propertyId: string, documentName: string, content: any) => {
    let body = new FormData()
    let combinedKey = userId + "-" + propertyId
    body.append("key", s3DocumentKey(combinedKey, documentName))
    body.append("file", content);
    return await postS3Headers(documentBucketUrl, body, { headers: { 'Accept': 'multipart/form-data' } });
};

const s3DocumentKey = (userId: string, documentName: string) => `${userId}/${documentName}`;