import { router } from "expo-router";

export function logout() {
    router.replace('/login');
}