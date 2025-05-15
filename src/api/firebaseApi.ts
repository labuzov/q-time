import { collection, doc, DocumentSnapshot, FirestoreError, getDoc, getDocs } from 'firebase/firestore';

import { firebaseFirestore } from '@/firebaseConfig';
import { logError } from '@/utils/logging';


type FirebaseData<T> = T & {
    id: string;
};

export const firebaseApi = {
    getDoc: async <T>(path: string) => {
        try {
            const snapshot = await getDoc(doc(firebaseFirestore, path));

            if (!snapshot.exists()) {
                throw new Error(`Doc '${path}' doesn't exist`);
            }
    
            return getDocumentData<T>(snapshot);
        } catch (error: unknown) {
            handleError(error);
        }
    },

    getDocs: async <T>(path: string) => {
        try {
            const snapshot = await getDocs(collection(firebaseFirestore, path));

            const data: T[] = [];

            for (const doc of snapshot.docs) {
                data.push(getDocumentData<T>(doc));
            }

            return data;
        } catch (error: unknown) {
            handleError(error);
        }
    },
}

const getDocumentData = <T>(docSnapshot: DocumentSnapshot) => {
    const docData = docSnapshot.data() as FirebaseData<T>;

    if (docData) {
        docData.id = docSnapshot.id;
    }
    return docData;
}

const handleError = (error: unknown) => {
    if (error instanceof Error) {
        logError(error.message);
    }

    if (error instanceof FirestoreError) {
        logError(error.message);
    }
}