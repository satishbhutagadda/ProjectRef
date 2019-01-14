export class HealthInsured {
    constructor(){
        this.initChilds();
    }
    firstName: string;
    middleName: string;
    lastName: string;
    relationShipWithProposer: string;
    dateOfBirth: string;
    age: string;
    gender: string;
    preExistingAilments: string;
    insuredCode: string;
    insuredType: string;
    occupation: string;
    planOption: string;
    idProof: string;
    idRefNumber: string;
    residenceProof: string;
    residenceRefNumber: string;
    insuredPartyCode: string;
    anyDiseaseOtherThanThoseListed: string;
    occupationDesc: string;
    height: number;
    weight: number;
    bmi: number;
    familyPhysicianName: string;
    familyPhysicianContactNumber: string;
    isInsuredOptingForPortability: string;
    claimInExpiringPolicy: string;
    hasPreExistingAilments: string = 'No';
    nomineeDetails: NomineeDetails;
    lifeStyleQuestions: LifeStyleQuestions;
    underwriterQuestions: UnderwriterQuestions;
    questionAnswerValues: QuestionAnswerValuesBean;
    additionalMedicalInfos: AdditionalMedicalInfos;
    portableSumInsureds: PortableSumInsureds;
    claimDetails: ClaimDetails;
    otherInsurancePolicyDetails: OtherInsurancePolicyDetails;
    uwDetails: UwDetails;
    //added by keerthi
    isInsuredAsNomineeToProposer: string;
    isInsuredAsGuardianToNominee: string;
    partyExists: string = "No";
    rolePlayerCode: string;
    maritalStatus: string = '';
    itemCode: string;
    showCoveragesInsured: boolean;
    fosPlan: string;
    selectedRidersList: string;
    releationShipList: string[];
    insuredPartyRoleId: string;
    customerReferenceNumber: string;
    claimRequested: string = "NO";
    portablePolicyInceptionDate: string;
    firstInceptionDate: string;
    expiryDate: string;
    previousYearClaimsAmount: string;
    lastYearBonus: string;
    loadingPercent: string;
    nonDisclosure: string = 'no';
    isExistingInsured: boolean;
    maxAgeForSIIncreaseWithoutReferral: number;
    isLoadingApplicable: string;
    copyFromInsured: boolean;
    addlQsnFactsProposedInfo: string;
    initChilds(){
        this.nomineeDetails = new NomineeDetails();
        this.lifeStyleQuestions = new LifeStyleQuestions();
        this.additionalMedicalInfos = new AdditionalMedicalInfos();
        this.portableSumInsureds = new PortableSumInsureds();
        this.claimDetails = new ClaimDetails();
        this.otherInsurancePolicyDetails = new OtherInsurancePolicyDetails();
        this.underwriterQuestions = new UnderwriterQuestions();
        this.uwDetails = new UwDetails();
        this.questionAnswerValues = new QuestionAnswerValuesBean();
    }
}

export class NomineeDetails {
    firstName: string;
    lastName: string;
    middleName: string;
    relationShipWithInsured: string;
    dateOfBirth: string;
    age: string;
    gender: string;
    nomineePartyCode: string;
    nomineePartyExists: string = 'No';
    nomineePartyRoleId: string;
}

export class LifeStyleQuestions {
    constructor(){
        this.initChilds();
    }
    questionAndAnswer: QuestionAndAnswer[];
    initChilds(){
        this.questionAndAnswer = [];
    }
}

export class UnderwriterQuestions {
    constructor(){
        this.initChilds();
    }
    questionAndAnswer: QuestionAndAnswer2[];
    initChilds(){
        this.questionAndAnswer = [];
    }
}

export class AdditionalMedicalInfos {
    constructor(){
        this.initChilds();
    }
    additionalMedicalInfo: AdditionalMedicalInfo[];
    initChilds(){
        this.additionalMedicalInfo = [];
    }
}

export class QuestionAnswerValuesBean {
    constructor(){
        this.initChilds();
    }
    questionAnswerValuesBean: QuestionAnswerValueBean[];
    initChilds(){
        this.questionAnswerValuesBean = [];
    }
}

export class PortableSumInsureds {
    constructor(){
        this.initChilds();
    }
    portableSumInsured: PortableSumInsured[];
    initChilds(){
        this.portableSumInsured = [];
    }
}

export class ClaimDetails {
    constructor(){
        this.initChilds();
    }
    claimDetail: ClaimDetail[];
    initChilds(){
        this.claimDetail = [];
    }
}

export class ClaimDetail {
    diagnosis: string;
    dateOfAdmission: string;
    dateOfDischarge: string;
    claimApprovalStatus: string;
    claimAmountPaid: string;
    reasonForClaimRejection: string;
}

export class PortableSumInsured {
    inceptionDate: string;
    sumInsured: any;
    expiryDate: string;
    cumulativeBonus: any;
    copay: any;
}

export class OtherInsurancePolicyDetails{
    constructor(){
        this.initChilds();
    }
    otherInsurancePolicyDetail: OtherInsurancePolicyDetail[];
    initChilds(){
        this.otherInsurancePolicyDetail = [];
    }
}

export class OtherInsurancePolicyDetail {
    insuredName: string;
    insurerName: string;
    policyNumber: string;
    inceptionDate: string;
    expiryDate: string;
    sumInsured: string;
    claimDetails: string;
}

export class UwDetails {
    constructor(){
        this.initChilds();
    }
    copayPercent: string;
    copayApplicable: string;
    initial30DaysWaitingPeriod: string;
    initial90DaysWaitingPeriod: string;
    maternityBenefitWaitingPeriod: string;
    pedBalanceSI: string;
    pedBalanceSIWP: string;
    personalDiseaseBalanceSI: string;
    personalDiseaseBalanceSIWP: string;
    specialDiseaseBalanceSI: string;
    specialDiseaseBalanceSIWP: string;
    specificDiseaseApplicable: string;
    remarks:string;
    humsStatus:string;
    preExistingAilments: PreExistingAilment[];
    ailmentWaitingPeriods: AilmentWaitingPeriod[];
    specialAilmentWaitingPeriods: SpecialAilmentWaitingPeriod[];
    initChilds(){
        this.ailmentWaitingPeriods = [];
        this.specialAilmentWaitingPeriods = [];
        this.preExistingAilments = [];
    }
}

/*export class PreExistingAilments{
    constructor(){
        this.initChilds();
    }
    preExistingAilments: PreExistingAilment[];
    preExistingAilment: PreExistingAilment;
    initChilds(){
        this.preExistingAilment = new PreExistingAilment();
        this.preExistingAilments = [];
    }
}*/

/*export class AilmentWaitingPeriods{
    constructor(){
        this.initChilds();
    }
    ailmentWaitingPeriods: AilmentWaitingPeriod[];
    ailmentWaitingPeriod: AilmentWaitingPeriod;
    initChilds(){
        this.ailmentWaitingPeriod = new AilmentWaitingPeriod();
        this.ailmentWaitingPeriods = [];
    }
}*/

export class PreExistingAilment {
    icdCode: string;
    icdDesc: string;
    previousPolicyPEDCode: string;
    previousPolicySI: string;
    previousPolicyWP: string;
}

export class AilmentWaitingPeriod {
    icdCode: string;
    icdDesc: string;
    waitingPeriod: string;
    previousPolicySI: string;
}

export class SpecialAilmentWaitingPeriod {
    previousPolicySI: string;
    waitingPeriod: string;
}

export class QuestionAndAnswer {
    questionNumber: number;
    question: string;
    answer: string;
    quantity: string;
    duration: string;
}

export class QuestionAndAnswer2 {
    questionNumber: number;
    question: string;
    answer: string;
}

export class AdditionalMedicalInfo {
    proposedPerson: string;
    illness: string;
    diagnosis: string;
    treatment: string;
    treatmentOutcome: string;
    attendingMedicalPractitioner: string;
    medicalPractitionerPhoneNnumber: string;
}

export class QuestionAnswerValueBean {
    id: any;
    question: string;
    answer: string;
    fieldDisplayType: string;
    fieldType: string;
    dependentFieldsForYes: string;
    dependentFieldsForNo: string;
    fieldNo: string;
    referralRequired: string;
    referralAnswer: string;
    referralDependentFields: string;
    iiField: string;
    subQuestionAnswersForYes: QuestionAnswerValueBean[];
    subQuestionAnswersForNo: QuestionAnswerValueBean[];
    subQuestion: string;
    subQuestionForYes: string;
    subQuestionForNo: string;
}