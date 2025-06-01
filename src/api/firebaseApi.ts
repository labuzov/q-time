import { addDoc, collection, doc, DocumentSnapshot, FirestoreError, getDoc, getDocs, UpdateData, updateDoc, writeBatch } from 'firebase/firestore';

import { firebaseFirestore } from '@/firebaseConfig';
import { logError } from '@/utils/logging';
import { getRandomId } from '@/utils/random';


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

    createDoc: async (path: string, document: UpdateData<unknown>) => {
        try {
            const snapshot = await addDoc(collection(firebaseFirestore, path), document);
            
            return snapshot.id;
        } catch (error: unknown) {
            handleError(error);
        }
    },

    updateDoc: async (path: string, document: UpdateData<unknown>) => {
        try {
            await updateDoc(doc(firebaseFirestore, path), document);
        } catch (error: unknown) {
            handleError(error);
        }
    },

    addDocs: async (path: string, documents: UpdateData<unknown>[]) => {
        try {
            const batch = writeBatch(firebaseFirestore);

            for (let i = 0; i < documents.length; i++) {
                const document = documents[i];
                const docId = getRandomId(12);

                batch.set(doc(firebaseFirestore, `${path}/${docId}`), document);
            }

            await batch.commit();
        } catch (error: unknown) {
            handleError(error);
        }
    },

    clearDocs: async (path: string) => {
        try {
            const { docs } = await getDocs(collection(firebaseFirestore, path));

            const batch = writeBatch(firebaseFirestore);

            for (const doc of docs) {
                batch.delete(doc.ref);
            }

            await batch.commit();
        } catch (error: unknown) {
            handleError(error);
        }
    }
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