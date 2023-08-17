import { FirebaseStorage, getDownloadURL, ref } from 'firebase/storage';
import { storage } from './firebase';

type GetUrlFn = (path: string) => Promise<string>;

/**
 * Download files from a firebase app path.
 * @description https://firebase.google.com/docs/storage/web/download-files?hl=es&authuser=0
 *
 * @param path Path from firebase
 * @returns Path to consume
 */
export const getUrlFromFirebasePath: GetUrlFn = async path => {
  // 1. Create a reference
  const pathReference = ref(storage, path);
  // 2. Download data through the URL
  return await getDownloadURL(pathReference);
};
