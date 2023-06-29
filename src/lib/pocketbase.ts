import PocketBase from 'pocketbase';
import { writable }  from 'svelte/store';
export const pb = new PocketBase('http://ec2-50-112-50-181.us-west-2.compute.amazonaws.com:8090/');
export const currentUser = writable(pb.authStore.model);

pb.authStore.onChange((auth) => {
  console.log('authStore changed',auth);
  currentUser.set(pb.authStore.model);
})