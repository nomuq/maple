import { getAuth, User } from "firebase/auth";
import {
  addDoc,
  collection,
  DocumentData,
  DocumentReference,
  Firestore,
  getDocs,
  getFirestore,
} from "firebase/firestore";

import { StorageReference } from "firebase/storage";

export enum ProjectCategory {
  DESIGN = "Design",
  ENGINEERING = "Engineering",
  MARKETING = "Marketing",
  OPERATIONS = "Operations",
  OTHER = "Other",
}

export enum ProjectType {
  SOFTWARE = "Software",
  PRODUCT = "Product",
  SERVICE = "Service",
  BUSINESS = "Business",
  OTHER = "Other",
}

export interface Project {
  name: string;
  description: string | null;
  category: ProjectCategory;
  type: ProjectType;
  icon: StorageReference | null;
  createdAt: Date;
  updatedAt: Date;
  createdBy: DocumentReference;
  collaborators: DocumentReference[];
}

export class ProjectService {
  private static instance: ProjectService;
  private database: Firestore = getFirestore();
  private auth = getAuth();

  private constructor() {}
  public static getInstance(): ProjectService {
    if (!ProjectService.instance) {
      ProjectService.instance = new ProjectService();
    }
    return ProjectService.instance;
  }

  public async getProjects(): Promise<DocumentData[]> {
    const snapshot = await getDocs(
      collection(this.database, `users/${this.auth.currentUser.uid}/projects`)
    );
    return snapshot.docs.map((doc) => doc.data());
  }

  public async createProject(project: Project): Promise<DocumentReference> {
    const docRef = await addDoc(collection(this.database, `projects`), project);
    await addDoc(
      collection(this.database, `users/${this.auth.currentUser.uid}/projects`),
      { id: docRef.id }
    );
    return docRef;
  }
}
