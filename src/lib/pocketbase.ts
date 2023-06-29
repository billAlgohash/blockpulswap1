import PocketBase from 'pocketbase';
import { writable }  from 'svelte/store';
export const pb = new PocketBase('http://172.31.52.167:8090/');
export const currentUser = writable(pb.authStore.model);

pb.authStore.onChange((auth) => {
  console.log('authStore changed',auth);
  currentUser.set(pb.authStore.model);
})