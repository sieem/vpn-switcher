import { writable } from "svelte/store";
import apiService from "./api.service";

export const activeServers = writable([]);

export const setActiveServers = async () => activeServers.set(await apiService.getServerList());
