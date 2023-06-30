import PocketBase from 'pocketbase';
import { writable }  from 'svelte/store';
// export const pb = new PocketBase('https://ec2-35-88-34-102.us-west-2.compute.amazonaws.com:8080/');

export const pb = new PocketBase('https://ec2-35-88-34-102.us-west-2.compute.amazonaws.com:3001/')
export const currentUser = writable(pb.authStore.model);

pb.authStore.onChange((auth) => {
  console.log('authStore changed',auth);
  currentUser.set(pb.authStore.model);
})