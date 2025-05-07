// hooks/useLoadUser.ts
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const useLoadUser = () => {
    const [user, setUser] = useState<{ nome: string; email?: string; profile?: string } | null>(null);

    useEffect(() => {
        const carregarUsuario = async () => {
        const data = await AsyncStorage.getItem('user');
        if (data) {
            setUser(JSON.parse(data));
        }
        };

        carregarUsuario();
    }, []);
    
    return user; // ✅ Retorna o usuário carregado
};
