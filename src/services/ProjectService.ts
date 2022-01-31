import { getAuth, User } from "firebase/auth";
import {
  addDoc,
  collection,
  doc,
  DocumentData,
  DocumentReference,
  Firestore,
  getDoc,
  getDocs,
  getFirestore,
  query,
  setDoc,
  Timestamp,
  where,
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
  id?: string;
  name: string;
  description: string | null;
  category: ProjectCategory;
  type: ProjectType;
  icon: StorageReference | null;
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
  collaborators: string[];
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

  public async getProject(id: string): Promise<Project> {
    const docRef = doc(this.database, `projects/${id}`);
    const project = await getDoc(docRef);
    const data = project.data() as Project;
    data.id = project.id;
    return data;
  }

  public async getProjects(): Promise<Project[]> {
    const q = query(
      collection(this.database, "projects"),
      where("collaborators", "array-contains", this.auth.currentUser.uid),
      where("createdBy", "==", this.auth.currentUser.uid)
    );
    const snapshot = await getDocs(collection(this.database, `projects`));
    return snapshot.docs.map((doc) => {
      const data = doc.data() as Project;
      data.id = doc.id;
      return data;
    });
  }

  public async createProject(project: Project): Promise<DocumentReference> {
    const docRef = await addDoc(collection(this.database, `projects`), {
      name: project.name,
      description: project.description,
      category: project.category,
      type: project.type,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
      createdBy: project.createdBy,
      collaborators: project.collaborators,
    });
    return docRef;
  }

  public async updateProject(project: Project): Promise<void> {
    const docRef = doc(this.database, `projects/${project.id}`);
    await setDoc(
      docRef,
      {
        name: project.name,
        description: project.description,
        category: project.category,
        type: project.type,
        createdAt: project.createdAt ?? Timestamp.now(),
        updatedAt: Timestamp.now(),
        createdBy: project.createdBy,
        collaborators: project.collaborators,
      },
      {
        merge: true,
      }
    );
  }
}
