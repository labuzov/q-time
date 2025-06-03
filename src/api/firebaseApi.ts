import { addDoc, collection, deleteDoc, doc, DocumentSnapshot, FieldPath, FirestoreError, getDoc, getDocs, query, UpdateData, updateDoc, where, WhereFilterOp, writeBatch } from 'firebase/firestore/lite';
import { FirebaseError } from 'firebase/app';

import { firebaseFirestore } from '@/firebaseConfig';
import { logError } from '@/utils/logging';
import { getRandomId } from '@/utils/random';
import { showErrorNotification } from '@/utils/notifications';


type FirebaseData<T> = T & {
    id: string;
};
type Filter = {
    fieldPath: string | FieldPath;
    opStr: WhereFilterOp;
    value: unknown
}

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

    getDocs: async <T>(path: string, filter?: Filter) => {
        try {
            let newQuery = query(collection(firebaseFirestore, path));
            if (filter) {
                const { fieldPath, opStr, value } = filter;

                newQuery = query(newQuery, where(fieldPath, opStr, value));
            }
            const snapshot = await getDocs(newQuery);

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
    },

    deleteDoc: async (path: string) => {
        try {
            await deleteDoc(doc(firebaseFirestore, path));
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

    if (error instanceof FirestoreError || error instanceof FirebaseError) {
        showErrorNotification(error.code);
        logError(error.message);
    }
}