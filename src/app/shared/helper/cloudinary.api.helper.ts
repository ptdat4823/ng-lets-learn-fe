import { CloudinaryFile } from '@shared/models/cloudinary-file';
import { sha1 } from 'js-sha1';

export const convertCloudinaryFileToRequestData = (file: CloudinaryFile) => {
  const { id, name, displayUrl, downloadUrl } = file;
  return {
    id: id.length === 4 ? null : id,
    name,
    displayUrl,
    downloadUrl,
  };
};

export const convertCloudinaryFilesToRequestData = (
  files: CloudinaryFile[]
) => {
  return files.map((file) => convertCloudinaryFileToRequestData(file));
};

export const getPublicIdFromCloudinaryUrl = (url: string) => {
  //E.g: url = http://res.cloudinary.com/dggtc5ucv/image/upload/v1720082993/jlqkd6dqyx4mrbsqhe31.jpg
  // -> public_id = jlqkd6dqyx4mrbsqhe31
  const parts = url.split('/');
  const publicId = parts[parts.length - 1].split('.')[0];
  return publicId;
};

export const generateSHA1 = (data: any) => {
  var hash = sha1.create();
  hash.update(data);
  return hash.hex();
};

export const generateSignature = (publicId: string, apiSecret: string) => {
  const timestamp = new Date().getTime();
  return `public_id=${publicId}&timestamp=${timestamp}${apiSecret}`;
};
