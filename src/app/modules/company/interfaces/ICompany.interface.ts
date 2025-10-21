export interface ICompany {
  companyId: number;
  companyName: string;
  companyDescription: string;
  companyAddress: string;
  companyPhone: string;
  companyEmail: string;
  companyWebsite: string;
  companyLogo: string;
  companyStatus: number;
  fechaHoraReg: Date;
  fechaHoraAct: Date;
  userIdReg: number;
  userIdAct: number;
}
