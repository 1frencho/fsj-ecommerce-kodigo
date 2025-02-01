declare module 'jspdf' {
  import { jsPDF } from 'jspdf';
  interface jsPDF {
    autoTable: (options: unknown) => void;
  }
}
