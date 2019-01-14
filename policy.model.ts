import { HealthInsured } from './healthinsured.model';
import { HomeInsured } from './homeinsured.model';
export class DynamicProperties {
    description: string;
    theValue: string;
    theRate: string;
    kind: string;
}

export class Limits {
    limitAmount: string;
    limitName: string;
    limitType: string;
    limitDisplayName: string;
    limitValues: string;
    selectedLimit: string;
}

export class Deductibles {
    deductibleAmount: string;
    deductibleName: string;
    deductibleType: string;
    deductibleDisplayName: string;
    deductibleValues: string;
    selectedDeductible: string;
}

export class Attributes {
    name: string;
    value: string;
    type: string;
    level: string;
    displayType: string;
    attributeValue: string;
    attributeType: string;
    strValue: string;
    numValue: string;
    valueList: string;
    displayName: string;
    dateValue: string;
}

export class DynamicProperties2 {
    description: string;
    theValue: string;
    theRate: string;
    kind: string;
}

export class Coverages {
    coverageName: string;
    coverageDisplayName: string;
    amount: string;
    fullTermAmount: string;
    priorTermAmount: string;
    compositeCoverage: string;
    rateFlag: string;
    limits: Limits[];
    deductibles: Deductibles[];
    attributes: Attributes[];
    dynamicProperties: DynamicProperties[];
    coverages: Coverages[];
    coverageRequired: string;
    isSelected: boolean = false;
    compatibilityType: string;
    displayType: string;
    additionalPremium: string;
    issuanceRate: string;
}

export class Attributes2 {
    name: string;
    value: string;
    type: string;
    level: string;
    displayType: string;
    attributeValue: string;
    attributeType: string;
    strValue: string;
    numValue: string;
    valueList: string;
    displayName: string;
    dateValue: string;
}

export class DriverDetails {
    driverDOB: string;
    driverAge: string;
    sex: string;
    driverAddress1: string;
    driverAddress2: string;
    driverAddress3: string;
    driverAddress4: string;
    driverAddress5: string;
    driverAddress: string;
    driverExperience: number;
    drivingLicenceNo: string;
    licenceIssueDate: string;
    licenceExpiryDate: string;
    licenceIssuingAuthority: string;
    typeOfLicence: string;
    relationshipOfDriver: string;
    employmentPeriod: number;
    endorsementsOnLicence: string;
    accidentInvolved: boolean = false;
    anyChargesByAuthority: boolean = false;
    driverSuffer: boolean = false;
    detailsOfSuffer: string;
}

export class ProposerDetails {
    constructor() {
        this.initChilds();
    }
    partyCode: string;
    firstName: string;
    lastName: string;
    middleName: string;
    address1: string;
    address2: string;
    address3: string;
    address4: string;
    city: string;
    cityCode: string;
    state: string;
    stateCode: string;
    pinCode: string;
    dateOfBirth: string;
    gender: string = '';
    partyType: string = '';
    salutation: string = 'Mr';
    mobile: string;
    residencePhoneCode: string;
    residencePhoneNumber: string;
    email: string;
    panNumber: string;
    //proposerPanNumber: string;
    occupation: string;
    proposerPoliticallyExposed: boolean = false;
    selectedPEP: string;
    idProof: string = '';
    idRefNumber: string;
    residenceProof: string = '';
    residenceRefNumber: string;
    nomineeName: string;
    nomineeLastName: string;
    nomineeRelationShip: string;
    nomineeDob: string;
    nomineeGender: string;
    nomineeMobileNumber: string;
    shareofBenefit: string;
    guardianName: string;
    guardianFirstName: string;
    guardianLastName: string;
    guardianRelationShip: string;
    guardianGender: string = '';
    guardianDob: string;
    nomineePartyCode: string;
    nomineeRoleId: string;
    guardianPartyCode: string;
    guardianRoleId: string;
    otherOccupationDesc: string;
    licenseDate: string;
    otherPEPDesc: string;
    customerGstNumber: string;
    vipFlag: string;
    isProposerNomineeAsProposer: boolean = false;
    insuranceRepositoryName: string;
    electronicInsuranceAccountNumber: string;
    customerAadharNumber: string;
    guardianAge: string;
    nomineeAge: string;
    stdPhone1: string;
    stdPhone2: string;
    stdFax: string;
    phone1: string;
    phone2: string;
    fax: string;
    policyPeriod: string;
    driverDetails: DriverDetails;
    kycCompliant: string;
    isInternationalAddress: boolean = false;
    isInternationalAddressForNominee: boolean = false;
    isPreferredCustomer: boolean = false;
    nomineeCity: string;
    nomineeState: string;
    guardianPartyExists: string;
    partyExists: string = 'No';
    customerSegment: string = '';
    customerCommunication: string = '';
    nomineeCountry: string;
    country: string;
    nationality: string;
    nomineeAddress1: string;
    nomineeAddress2: string;
    nomineeAddress3: string;
    nomineeAddress4: string;
    nomineePincode: string;
    nomineeStdPhone1: string;
    nomineePhone1: string;
    nomineeStdPhone2: string;
    nomineePhone2: string;
    sendPolicyDocOverMail: boolean;
    nomineeOccupation: string;
    agentPartyType: string;
    maritalStatus: string;
    educationalQualification: string;
    annualIncome: string ='';
    nomineeMiddleName: string;
    guardianMiddleName: string;
    internationalNomineeCity: string;
    internationalNomineeState: string;
    internationalNomineePincode: string;
    internationalMobile: string;
    internationalPincode: string;
    internationalState: string;
    internationalCity: string;
    familyDoctor: string;
    doctorContactNumber: string;
    sundaramGroupEmployee: boolean = false;
    empRelationshipType: string;
    empRelationshipCompanyName: string;
    empRelationshipRefNumber: string;
    doyoueia: string = '';
    doyouwantopeneia: string = '';
    enameasperbankaccount: string;
    eaccountnumber: string;
    ebankname: string;
    eifsccode: string;
    husbandnameorfathername: string;
    permanentaddress1: string;
    permanentaddress2: string;
    permanentaddress3: string;
    permanentaddress4: string;
    permanentcity: string;
    permanentstate: string;
    dob: string;
    customerReferenceNumber: string;
    intermediaryReference: string;
    intermediaryRelationship: string;
    loanAmount: any;
    loanApplicationNumber: any;
    loanAccountNumber: any;
    internationalStdPhone1: string;
    internationalPhone1: string;
    internationalStdPhone2: string;
    internationalPhone2: string;
    internationalNomineeStdPhone1: string;
    internationalNomineePhone1: string;
    internationalNomineeStdPhone2: string;
    internationalNomineePhone2: string;
    internationalEmail: string;
    initChilds() {
        this.driverDetails = new DriverDetails();
    }
}


export class CitiAdditionalDetails {
    productName: string;
    schemeCode: string;
    combiSchemeCode: string;
    regchannel: string;
    rmId1: string;
    relCode: string = '';
    rmCode1: string;
    rmName: string;
    citiAgentName: string;
    dsaRefNumber: string;
    prodClass: string;
}

export class AdditionalInfo {
    id?: any;
    propertyName: string;
    propertyValue: string;
    infoType: string;
    mandatoryCheck: boolean;
}

export class PrivatePassengerCar {
    financierState: string = "";
    totalIdv: string;
    paidDriver: string;
    numberOfDrivers: string;
    dayParking: string = '';
    nightParking: string = '';
    vehicleType: string;
    areaOfOperation: string;
    antiTheftFeatures: string;
    vehicleColor: string = '';
    subline: string = '';
    listPriceDate: string;
    autoAssoicationMembershipNo: string;
    previousInsurerAddress2: string;
    previousInsurerAddress3: string;
    previousInsurerAddress4: string;
    registrationNumber: string;
    registrationNoPart1: string;
    registrationNoPart2: string;
    registrationNoPart3: string;
    registrationNoPart4: string;
    serviceProviderName: string = '';
    virNumber: string;
    fraudReasons: string = null;
    antiqueVehicle: boolean = false;
    yearOfManufacture: string;
    companyUse: boolean = false;
    fibreGlassBody: boolean = false;
    designedForHandicapped: boolean = false;
    registrationZone: string;
    averageMilage: string = '0';
    numberOfOperators: string;
    biFuelKit: boolean = false;
    make: string;
    model: string;
    idvDeviation: string;
    registrationState: string;
    registrationAddressLine1: string;
    registrationAddressLine2: string;
    registrationAddressLine3: string;
    registrationAddressLine4: string;
    modelBusinessStatus: string;
    vehicleAge: string = '0';
    declinedpool: boolean = false;
    fraudIndicator: string = 'false';
    breakInLoading: string = '0';
    previousPolicyroadtax: string = 'No';;
    previousPolicyDepreciationWaiver: string = 'No';
    previousPolicyWindShieldGlass: string = 'No';
    previousPolicyInvoicePrice: string = 'No';
    previousPolicyLossOfBaggage: string;
    previousPolicySparecar: string = 'No';
    previousPolicyncbPlan: string = 'No';
    previousPolicyaggravationPlan: string = 'No';
    previousPolicyKeyRepCoverPlans: string = 'No';
    sysGenImtNumbers: string;
    sysGenRsmoacNumbers: string;
    technicalDiscountbasedonncb: string;
    typeOfRegistration: string = "New";
    dateOfRegistration: string;
    registeringAuthority: string;
    registeringLocation: string;
    registrationAddressSameAsMailingAddress: boolean = false;
    technicalPricingAge: string;
    classofvehicle: string;
    engineNo: string;
    engineCapacity: string = '0.0';
    seatingCapacity: string = '';
    chassisNo: string;
    claimsFreeYears: string;
    fuelType: string = '';
    geographicalAreaExtension: boolean = false;
    vehicleOwnership: string = '';
    vintageCar: boolean = false;
    bodyType: string = '';
    newVehicle: boolean = false;
    vehicleUsage: string = '';
    vehicleCondition: string = '';
    financierDetails: string = '';
    monthlyMileageRun: string;
    domicile: string = '';
    safetyFeatures: string = '';
    vehicleMostlyDrivenOn: string = '';
    noOfVehiclesOwnedByProposer: string;
    periodicServiceOfVehicle: string = '';
    vehicleMostlyDrivenBy: string = '';
    importedVehicle: boolean = false;
    noOfYearsOfServiceWithTheProposer: string;
    caravanTrailerTowingFacility: boolean = false;
    slNumberOfCaravanTrailer: string;
    previousPolicyNcd: string = '';
    generateNcdLetter: boolean = false;
    vehicleInspectionReport: boolean = false;
    preExistingDamage: boolean = false;
    photoUploadingDone: boolean = false;
    vehicleFittedWithFibreGlassTank: boolean = false;
    premiumAdjustmentPercentage: string = '0.0';
    loadingPercentage: string = '0';
    imposedDeductible: string = '0.0';
    oldLoadingPercentage: string = '0.0';
    oldImposedDeductible: string = '0.0';
    compulsaryDeductible: string;
    discountFactor: string = '';
    statedValueOfVehicle: string;
    listPrice: string = '.00';
    vehicleFittedWithAntiTheft: boolean = false;
    payOutEligible: boolean = false;
    vehicleUsedWithinTheProposersPremises: boolean = false;
    registrationRegion: string;
    memberOfAutoAssociation: boolean = false;
    modelCode: string;
    pinCode: string;
    customDutyPaid: boolean = false;
    chassisValue: string;
    bodyValue: string = '.00';
    premiumAdjustmentFactor: boolean = false;
    cityCode: string;
    makeCode: string;
    technicalDiscount: string = '0.0';
    finalDiscount: string = '0';
    commission: string = '';
    payOut: string = '';
    previousIDVFlag: string = '0';
    previousPolicyIDV: string = '0.0';
    registrationchargesRoadtax: boolean = false;
    depreciationWaiver: boolean = false;
    windShieldGlass: boolean = false;
    spareCarClause: boolean = false;
    invoicePrice: boolean = false;
    lossOfBaggage: boolean = false;
    systemGeneratedUnExpiredRoadTax: string;
    unExpiredRoadTaxRate: string;
    depreciationWaiverRate: string;
    windShieldGlassRate: string;
    spareCarRate: string;
    invoicePriceRate: string;
    lossOfBaggageRate: string;
    spareCarLimit: string;
    systemGeneratedInvoicePrice: string;
    systemGeneratedBenefitPerDay: string;
    rateFor150: string;
    rateFor50: string;
    geographyGroup: string;
    adequacyOfInfo: boolean = false;
    odometerReading: string;
    oldOdometerReading: string;
    appreciatedInvoicePrice: string;
    ncbProtection: boolean = false;
    aggravation: boolean = false;
    ncbProtectionRate: string;
    aggravationRate: string;
    ncbPlan: string = '';
    aggravationPlan: string = '';
    keyReplacementCover: boolean = false;
    keyReplacementCoverPlan: string;
    keyReplacementCoverRate: string;
    isSecoundHandVehicle: string;
    roadTaxSumInsured: string = '0';
    newDepWaiverRate: string;
    autoAssoicationName: string;
    additionalComments: string;
    countryDetails: string;
    detailsOfCaravanTrailer: string;
    detailsOfDamage: string;
    expiryDate: string;
    financierInterestHypothecatedTo: string;
    hypothecatedToLeaseHirePurchaseWith: string;
    inspectionDate: string;
    makeAndModelOfTheCaravanTrailer: string;
    numOfPeopleDrivingTheCar: string;
    previousInsurer: string;
    previousInsurerAddress: string;
    previousPolicyNo: string;
    vinNumber: string;
    unExpiredRoadTaxDiscRate: string;
    depreciationWaiverDiscRate: string;
    windShieldGlassDiscRate: string;
    spareCarDiscRate: string;
    invoicePriceDiscRate: string;
    lossOfBaggageDiscRate: string;
    ncbProtectionDiscRate: string;
    aggravationDiscRate: string;
    keyReplacementCoverDiscRate: string;
    tyreCoverClauseCoverRate: string;
    tyreCoverClauseCoverDiscRate: string;
    tyreCoverClause: boolean = false;
    imtNumber: string;
    depreciatedChassisValue: string;
    campaignCode: string;
    campaignName: string = '';
    previousPolicyType: string = '';
    contractNumber: string;
    claimAmount: string;
    electricalAccessIdv: string;
    nonElectricalAccessIdv: string;
    cngLPGIdv: string;
    previousTyreCoverClause: string = 'No';
    previousPolicyExpiryDate: string = "";
    virStatus: string = "";
    voluntaryDeductible: string = "0.0";
    tyreDetails: TyreDetails[] = [];
    isPaOwnerDriverCar: boolean = true;
    paWaiverReason: string = "";
    paOwnerDriverInsName: string;
    paOwnerDriverPolicyNumber: string;
    paOwnerDriverExpiryDate: string;

}

export class TyreDetails {
    id: number;
    ppcId: number;
    variant: string = "";
    makeOfTyre: string = "";
    dotTyreIdentNo: string = "";
    tyreIndex: number;
}

export class TrailerDetailsList {
    trailerMake: string = "";
    trailerModel: string = "";
    trailerModelCode: string;
    trailerIDV: string = "";
    trailerYearOfManufacture: string = "";
    trailerChassisNumber: string = "";
    trailerTypeOfRegistration: string = 'New';
    trailerRegistrationNumber: string = "";
    trailerNumber: string;
    trailerCarryingCapacity: string;
    commercialvehicleid: string;
    trailerODPremium: string;
    trailerTPPremium: string;

    OldregistrationNoPart1: string;
    OldregistrationNoPart2: string;
    registrationNoPart1: string;
    registrationNoPart2: string;
    registrationNoPart3: string;
    registrationNoPart4: string;
    registraionNumber: string;
    requiredChild: boolean;
}

export class CommercialVehicle {
    isPaOwnerDriverCar: boolean = true;
    paWaiverReason: string = "";
    paOwnerDriverInsName: string;
    paOwnerDriverPolicyNumber: string;
    paOwnerDriverExpiryDate: string;
    financierState: string = "";
    previousPolicyExpiryDate: string = "";
    totalIdv: string;
    dayParking: string = '';
    nightParking: string = '';
    vehicleType: string;
    safetyFeatures: string = '';
    areaOfOperation: string;
    domicile: string = '';
    antiTheftFeatures: string;
    vehicleColor: string = '';
    subline: string = '';
    listPriceDate: string;
    autoAssoicationMembershipNo: string;
    previousInsurerAddress2: string;
    previousInsurerAddress3: string;
    previousInsurerAddress4: string;
    registrationNumber: string;
    registrationNoPart1: string;
    registrationNoPart2: string;
    registrationNoPart3: string;
    registrationNoPart4: string;
    serviceProviderName: string = '';
    virNumber: string;
    fraudReason: string = '';
    antiqueVehicle: boolean = false;
    yearOfManufacture: string;
    companyUse: boolean = false;
    fibreGlassBody: boolean = false;
    designedForHandicapped: boolean = false;
    registrationZone: string;
    averageMilage: string = '0';
    numberOfOperators: string;
    biFuelKit: boolean = false;
    make: string;
    model: string;
    idvDeviation: string;
    registrationState: string;
    registrationAddressLine1: string;
    registrationAddressLine2: string;
    registrationAddressLine3: string;
    registrationAddressLine4: string;
    modelBusinessStatus: string;
    vehicleAge: string = '0';
    declinedpool: boolean = false;
    fraudIndicator: string = 'false';
    breakInLoading: string = '0';
    previousPolicyroadtax: string = 'No';;
    previousPolicyDepreciationWaiver: string = 'No';
    previousPolicyWindShieldGlass: string = 'No';
    previousPolicyInvoicePrice: string = 'No';
    previousPolicyLossOfBaggage: string;
    previousPolicySparecar: string = 'No';
    previousPolicyncbPlan: string = 'No';
    previousPolicyaggravationPlan: string = 'No';
    previousPolicyKeyRepCoverPlans: string = 'No';
    sysGenImtNumbers: string;
    sysGenRsmoacNumbers: string;
    technicalDiscountbasedonncb: string;
    typeOfRegistration: string = "New";
    dateOfRegistration: string;
    registeringAuthority: string;
    registeringLocation: string;
    registrationAddressSameAsMailingAddress: string;
    technicalPricingAge: string;
    classofvehicle: string;
    engineNo: string;
    engineCapacity: string = '0.0';
    seatingCapacity: string = '';
    chassisNo: string;
    claimsFreeYears: string;
    fuelType: string = '';
    geographicalAreaExtension: boolean = false;
    vehicleOwnership: string = '';
    newVehicle: boolean = false;
    typeOfVehicle: string;
    typeOfUsage: string;
    typeOfPassengersCarried: string = '';
    financierDetails: string = '';
    monthlyMileageRun: string;
    vehicleMostlyDrivenOn: string = '';
    noOfVehiclesOwned: string;
    importedVehicle: boolean = false;
    paidDriver: boolean = false;
    yearsOfServiceWithProposer: string;
    previousPolicyNcd: string = '';
    generateNcdLetter: boolean = false;
    vehicleInspectionReport: boolean = false;
    preExistingDamage: boolean = false;
    isPhotoUploadingDone: boolean = false;
    isTheVehicleModifiedForGoodsCarryingAlso: boolean = false;
    isTheVehicleFittedWithFibreGlassTank: boolean = false;
    grossVehicleWeight: string;
    availabilityOfFitnessCertificateAtTheTimeOfProposal: boolean = false;
    listPrice: string = '.00';
    statedValueOfVehicle: string;
    memberOfAutoAssociation: boolean = false;
    premiumAdjustmentPercentage: string = '0.0';
    vehicleFittedWithAntiTheft: boolean = false;
    loadingPercentage: string = '0';
    imposedDeductible: string = '0.0';
    discountFactor: string = '';
    oldLoadingPercentage: string = '0.0';
    oldImposedDeductible: string = '0.0';
    compulsaryDeductible: string;
    premiumAdjustmentFactor: boolean = false;
    vehicleUsedWithinTheProposersPremises: boolean = false;
    registrationRegion: string;
    customDutyPaid: boolean = false;
    isTrailerAttached: boolean = false;
    trailerCarryingCapacity: string;
    trailerIDV: string;
    trailerODPrem: string;
    pinCode: string;
    chassisValue: string = '.00';
    bodyValue: string = '.00';
    modelCode: string;
    noOfDrivers: string = '1';
    noOfConductors: string = '0';
    noOfCleaners: string = '0';
    noOfCoolies: string = '0';
    cityCode: string;
    makeCode: string;
    actualNCB: string;
    additionalNCB: string;
    additionalNCBApplicable: boolean = false;
    commission: string = '';
    technicalDiscount: string = '0.0';
    finalDiscount: string = '0';
    discountAdjustedinOD: string;
    previousIDVFlag: string = '0';
    previousPolicyIDV: string = '0.0';
    trailerYearOfManufacture: string = "";
    depreciationWaiver: boolean = false;
    windShieldGlass: boolean = false;
    depreciationWaiverRate: string;
    windShieldGlassRate: string;
    payOutEligible: boolean = false;
    payOut: string = '';
    newDepWaiverRate: string;
    sfRuralPACover: boolean = false;
    noOfTrailersAttached: string = '0';
    trailerODPremium: string;
    trailerTPPremium: string;
    isSecoundHandVehicle: string;
    seatingCapRange: string;
    country: string;
    inspectionDate: string;
    natureOfGoodsCarried: string;
    periodicServiceBy: string;
    detailsOfDamage: string;
    previousInsurer: string;
    previousInsurerAddress: string;
    previousPolicyNo: string;
    typeOfGoodsCarried: string;
    typeOfPermit: string;
    vehicleCondition: string = '';
    vehicleMostlyDrivenBy: string = '';
    vinNumber: string;
    additionalComments: string;
    trailerRegistrationNumber: string;
    trailerMake: string;
    trailerModel: string;
    otherInfo: string;
    vehicleGroup: string;
    financierInterestHypothecatedTo: string;
    hypothecatedToLeaseHirePurchaseWith: string;
    typeOfBody: string;
    imtNumber: string;
    depreciatedChassisValue: string;
    campaignCode: string;
    campaignName: string = '';
    previousPolicyType: string = '';
    contractNumber: string;
    trailerDetailsList: TrailerDetailsList[] = [];
    claimAmount: string;
    discountModeration1: string = 'No';
    discountModeration2: string = 'No';
    electricalAccessIdv: string;
    nonElectricalAccessIdv: string;
    cngLPGIdv: string;
    fraudReasons: string = null;
    towedBy: string;
    previousTyreCoverClause: string = 'No';
    virStatus: string = "";

}

export class MotorCycle {
    isPaOwnerDriverCar: boolean = true;
    paWaiverReason: string = "";
    paOwnerDriverInsName: string;
    paOwnerDriverPolicyNumber: string;
    paOwnerDriverExpiryDate: string;
    financierState: string = "";
    previousPolicyExpiryDate: string = "";
    totalIdv: string;
    dayParking: string = '';
    nightParking: string = '';
    vehicleType: string;
    areaOfOperation: string;
    antiTheftFeatures: string;
    vehicleColor: string = '';
    subline: string;
    listPriceDate: string;
    autoAssoicationMembershipNo: string;
    previousInsurerAddress2: string;
    previousInsurerAddress3: string;
    previousInsurerAddress4: string;
    //registrationNo: string;
    serviceProviderName: string = '';
    virNumber: string;
    fraudReason: string = '';
    sysGenRsmoacNumbers: string;
    antiqueVehicle: boolean = false;
    yearOfManufacture: string;
    companyUse: boolean = false;
    fibreGlassBody: boolean = false;
    designedForHandicapped: boolean = false;
    registrationZone: string;
    averageMilage: string = '0';
    numberOfOperators: string;
    biFuelKit: boolean = false;
    make: string;
    model: string;
    idvDeviation: string;
    registrationState: string;
    registrationAddressLine1: string;
    registrationAddressLine2: string;
    registrationAddressLine3: string;
    registrationAddressLine4: string;
    modelBusinessStatus: string;
    vehicleAge: string = '0';
    declinedpool: boolean = false;
    fraudIndicator: string = 'false';
    breakInLoading: string = '0';
    previousPolicyroadtax: string = 'No';;
    previousPolicyDepreciationWaiver: string = 'No';
    previousPolicyWindShieldGlass: string = 'No';
    previousPolicyInvoicePrice: string = 'No';
    previousPolicyLossOfBaggage: string;
    previousPolicySparecar: string = 'No';
    previousPolicyncbPlan: string = 'No';
    previousPolicyaggravationPlan: string = 'No';
    previousPolicyKeyRepCoverPlans: string = 'No';
    sysGenImtNumbers: string;
    technicalDiscountbasedonncb: string;
    idv: string;
    idv2: string;
    idv3: string;
    registrationOldNew: string = "New";
    discretionDiscount: string;
    diffOfFinalDiscAndNewFinalDisc: string;
    diffOfODPremiumAndNewODPremium: string;
    registeringAuthority: string;
    dateofRegistrationOfTheVehicle: string;
    registeringLocationOrCity: string;
    registrationAddressSameAsMailingAddress: boolean = false;
    engineNo: string;
    engineCapacity: string = '0.0';
    seatingCapacity: string = '';
    chassisNo: string = '';
    claimsFreeYears: string;
    fuelType: string = '';
    geographicalAreaExtension: boolean = false;
    vehicleOwnership: string = '';
    newVehicle: boolean = false;
    vehicleUsage: string = '';
    vehicleCondition: string = '';
    financierDetails: string = '';
    monthlyMileageRun: string;
    isTheVehicleFittedWithSideCar: boolean = false;
    domicile: string = '';
    vehicleMostlyDrivenOn: string = '';
    noOfVehiclesOwnedByProposerFamily: string;
    periodicalServiceOfTheVehicle: string;
    vehicleMostlyDrivenBy: string = '';
    vehicleIsImported: boolean = false;
    noOfYearsOfServiceOfPaidDriver: boolean = false;
    previousPolicyNcd: string = '';
    generateNCDLetterCheckbox: boolean = false;
    vehicleInspectionReportAttachedCheckbox: boolean = false;
    preExistingDamage: boolean = false;
    isPhotoUploadingPercentageDone: boolean = false;
    premiumAdjustmentPercentage: string = '0.0';
    loadingPercentage: string = '0';
    imposedDeductible: string = '0.0';
    oldLoadingPercentage: string = '0.0';
    oldImposedDeductible: string = '0.0';
    compulsaryDeductible: string;
    discountFactor: string = '';
    modelCode: string;
    pinCode: string;
    customDutyPaid: boolean = false;
    chassisValue: string;
    bodyValue: string = '.00';
    classofvehicle: string;
    registrationRegion: string;
    memberOfAutoAssociation: boolean = false;
    premiumAdjustmentFactor: boolean = false;
    bodyType: string = '';
    vehicleFittedWithAntiTheft: boolean = false;
    cityCode: string;
    makeCode: string;
    technicalDiscount: string = '0.0';
    finalDiscount: string = '0';
    commission: string = '';
    previousIDVFlag: string = '0';
    previousPolicyIDV: string = '0.0';
    payOutEligible: boolean = false;
    payOut: string = '';
    listPrice: string = '.00';
    isSecoundHandVehicle: string;
    maxVehicleAgeAllowed: string;
    femaleDiscount: string;
    nillIMDDisc: string;
    bulkDealDisc: string;
    seatingCapRange: string;
    safetyFeatures: string = '';
    additionalComments: string;
    countryDetailsOfGeograhicalArea: string;
    detailsOfDamage: string;
    expiryDate: string;
    financierInterestHypothecatedTo: string;
    hypothecatedToOrLeaseOrHirePurchaseWith: string;
    inspectionDate: string;
    monthlyMilageRun: string;
    noOfPeopleUsingTheVehicle: string;
    previousInsurerAddress: string;
    autoAssoicationName: string;
    previousPolicyNo: string;
    vinNumber: string;
    previousInsurer: string;
    imtNumber: string;
    depreciatedChassisValue: string;
    campaignCode: string;
    campaignName: string = '';
    previousPolicyType: string = '';
    contractNumber: string;
    dayTimeParking: string;
    nightTimeParking: string;
    claimAmount: string;
    electricalAccessIdv: string;
    nonElectricalAccessIdv: string;
    cngLPGIdv: string;
    fraudReasons: string = null;
    registrationNumber: string;
    registrationNoPart1: string;
    registrationNoPart2: string;
    registrationNoPart3: string;
    registrationNoPart4: string;
    previousTyreCoverClause: string = 'No';
    hypothecatedToLeaseHirePurchaseWith: string;
    virStatus: string = "";
    voluntaryDeductible: string = "0.0";
}

export class MotorisedVehicle {
    privatePassengerCar: PrivatePassengerCar;
    commercialVehicle: CommercialVehicle;
    motorCycle: MotorCycle;

}

export class Limits2 {
    limitAmount: string;
    limitName: string;
    limitType: string;
    limitDisplayName: string;
    limitValues: string;
    selectedLimit: string;
}

export class Deductibles2 {
    deductibleAmount: string;
    deductibleName: string;
    deductibleType: string;
    deductibleDisplayName: string;
    deductibleValues: string;
    selectedDeductible: string;
}

export class Attributes3 {
    name: string;
    value: string;
    type: string;
    level: string;
    displayType: string;
    attributeValue: string;
    attributeType: string;
    strValue: string;
    numValue: string;
    valueList: string;
    displayName: string;
    dateValue: string;
}

export class DynamicProperties3 {
    description: string;
    theValue: string;
    theRate: string;
    kind: string;
}

export class Coverages2 {
    coverageName: string;
    coverageDisplayName: string;
    amount: string;
    fullTermAmount: string;
    priorTermAmount: string;
    compositeCoverage: string;
    rateFlag: string;
    limits: Limits2;
    deductibles: Deductibles2;
    attributes: Attributes3;
    dynamicProperties: DynamicProperties3;
    coverageRequired: string;
    isSelected: string;
    compatibilityType: string;
    displayType: string;
    additionalPremium: string;
    issuanceRate: string;
}

export class RiskDetails {
    constructor() {
        this.initChilds();
    }
    healthInsured: HealthInsured;
    homeInsured: HomeInsured;
    motorisedVehicle: MotorisedVehicle;
    coverages: Coverages2;
    coveragesForm: CoveragesForm;
    initChilds() {
        this.healthInsured = new HealthInsured();
        this.coveragesForm = new CoveragesForm();
    }
}

export class PreviousPolicyDetails {
    insurerName: string;
    policyExpiryDate: string;
    insurerBranchPlace: string;
    insurerBranchCode: string;
    policyNumber: string;
    productType: string;
    portableRiders: string;
    portingReason: string;
    portingOtherReason: string;
    pedExclusion: string;
}

export class PosAgentDetails {
    posCode: string;
    posName: string;
    panNumber: string;
    licensed: string;
    aadharNumber: string;
    mobile: string;
    licenseExpiryDate: string;
    licenseNumber: string;
    invalidPosAgent: boolean = false;
}

export class OaAgentDetails {
    agentCode: string;
    agentName: string;
    mobile: string;
    licensed: string;
    address1: string;
    address2: string;
    address3: string;
    address4: string;
    landLine: string;
    licenseExpiryDate: string;
    inwardDate: string;
    licenseNumber: string;
}

export class CombiInsuredDetails {
    combiFirstName: string;
    combiLastName: string;
    combiDob: string;
    combiGender: string;
    combiOccupation: string;
    combiRelationship: string;
    hasPreExistingAilments: string;
    preExistingAilments: string;
    combiInsuredAge: string;
    combiGuardianName: string;
    combiGuardianDob: string;
    combiGuardianRelationShip: string;
    combiGuardianAge: string;
}

export class EndorsementChangeLog {
    filedName: string;
    oldValue: string;
    newValue: string;
}

export class Cheque {
    chequeNumber: string;
    chequeDate: string;
    bank: string;
    branch: string;
    amount: string;
    isCustomerCheque: string;
    receiptNumber: string;
    isLocal: string;
    CBCNumber: string;
    existsInDB: string;
    agentCode: string;
    refferalRequiredFlag: string;
    legacyCode: string;
    isAPDreceipt: string;
    newchequeNumber: string;
    endorsementCode: string;
    type: string;
}

export class Deposit {
    amount: string;
    isCustomerDeposit: string;
    receiptNumber: string;
    referenceNumber: string;
    CBCNumber: string;
    existsInDB: string;
    legacyCode: string;
    isAPDreceipt: string;
    endorsementCode: string;
    refferalRequired: string;
    agentCode: string;
}

export class Receipt {
    receiptNumber: string;
    amount: string;
    policyCode: string;
    policyCodeDisplay: string;
    receiptDate: string;
    partyName: string;
    partyId: string;
    balance: string;
    type: string;
    CBCNumber: string;
    endorsementCode: string;
    balanceStr: string;
    amountStr: string;
}

export class DirectCredit {
    accountHolderName: string;
    amount: string;
    depositBank: string;
    isCustomerCredit: string;
    receiptNumber: string;
    referenceNumber: string;
    charges: string;
    micrCode: string;
    transactionNo: string;
    recievedDate: string;
    ifscCode: string;
    refferalRequired: string;
    isAPDreceipt: string;
    CBCNumber: string;
    agentCode: string;
    type: string;
    existsInDB: string;
    legacyCode: string;
}

export interface DirectDebit {
    dateOfRemittance: string;
    amount: number;
    bankAccount: string;
    bankCode: string;
    bankName: string;
    isCustomerDeposit: boolean;
    receiptNumber: string;
    referenceNumber: string;
    cbcNumber: string;
    productCode: string;
    customerName: string;
    refferalRequired: boolean;
    transactionNo: string;
}

export interface Card {
    cardNumber: string;
    amount: number;
    bank: string;
    cardType: string;
    cardExpiryDate: string;
    isCustomerDeposit: boolean;
    receiptNumber: string;
    referenceNumber: string;
    cardDate: string;
    bankCode: string;
    branch: string;
    cvnNumber: string;
    cbcNumber: string;
    refferalRequired: boolean;
    isAPDreceipt: boolean;
}

export interface PaymentGateway {
    transactionID: string;
    transactionAmount: number;
    transactionStatus: string;
    merchantTrackID: string;
    transactionPaymentId: string;
    transactionReferenceNo: string;
    errorDesc: string;
    description: string;
    cbcNumber: string;
    receiptNumber: string;
    transactionDate: string;
    quoteNumber: string;
    createdBy: string;
}

export interface AgentNeft {
    policyCode: string;
    amount: number;
    transactionDate: string;
    hasGenerated: boolean;
    generatedTime: string;
    agentCode: string;
    branchCode: string;
    cbcNumber: string;
    receiptNumber: string;
    customerName: string;
}

export interface AgentCheque {
    policyCode: string;
    amount: number;
    transactionDate: string;
    hasGenerated: boolean;
    generatedTime: string;
    agentCode: string;
    branchCode: string;
    cbcNumber: string;
    receiptNumber: string;
    customerName: string;
}

export interface CSCPaymentGateway {
    pgtransactionId: number;
    transactionAmount: string;
    merchanttransactionId: string;
    cbcNumber: string;
    receiptNumber: string;
    refferalRequired: boolean;
}

export class Payment {
    constructor() {
        this.initChilds();
    }
    cheques: Cheque[];
    deposits: Deposit[];
    receipts: Receipt[];
    directCredits: DirectCredit[];
    directDebits: DirectDebit[];
    cards: Card[];
    paymentGateways: PaymentGateway[];
    agentNefts: AgentNeft[];
    agentCheques: AgentCheque[];
    cscPaymentGateways: CSCPaymentGateway[];
    initChilds() {
        this.cheques = [];
        this.deposits = [];
        this.receipts = [];
        this.directCredits = [];
        this.directDebits = [];
        this.cards = [];
        this.paymentGateways = [];
        this.agentNefts = [];
        this.agentCheques = [];
        this.cscPaymentGateways = [];
    }
}

export class PolicyDetails {
    constructor() {
        this.initChilds();
    }
    splitScrrenDITStatus: boolean = false;
    isQuickQuote: boolean;
    isEnrichQuote: boolean;
    clientCumAgent: boolean = false;
    id: string;
    productName: string = '';
    plmProductName: string = '';
    productDisplayName: string;
    channel: string = '';
    salesCompany: string = '';
    bdoCode: string;
    bdoName: string;
    isPOSPolicy: string = 'No';
    posDetailsId: string;
    jurisdiction: string = 'India';
    packageName: string;
    packageDisplayName: string;
    inceptionDate: any;
    createdBy: string;
    agentCode: string;
    oaCode: string;
    agentName: string;
    agentPartyType: string;
    businessStatus: string;
    branchCode: string;
    branchName: string;
    policyCode: string;
    xgenPolicyCode: string;
    expiryDate: string;
    creationDate: string;
    uprGenerated: string;
    endorsementCode: string;
    endorsementDate: string;
    hasRenewed: string;
    transactionType: string = 'NB';
    agentCommissionRate: string;
    agentCommissionAmount: string;
    subline: string = '';
    techDiscountApplicable: string;
    commDiscountApplicable: string;
    coInsuranceApplicable: string;
    isRenewalExtraction: string;
    netChangeAmount: string;
    maxCoverPeriod: string;
    external: string;
    commissionApplicable: string;
    commissionRate: string;
    refundFlag: string;
    manualCoverNote: boolean = false;
    electronicCoverNote: string;
    coverNotePremium: string;
    quoteNumber: string;
    policyOriginalPrinted: string;
    hasUploaded: string;
    paymatrixProductPlan: string = '';
    lastModifiedTime: string;
    lastModifiedBy: string;
    internalUser: string;
    selfOrBehalf: string;
    policyDuration: number;
    renewalApplicable: string;
    isLatest: string;
    mailInSourceId: string;
    workflowStatus: string;
    policyRejectCount: string;
    noOfTimesSent: string;
    isReceiptCreated: string;
    autoRenewal: string = "";
    agentGroupCode: string;
    referenceNumber: string;
    policyType: string;
    livesCovered: string;
    isPreferredCustomer: boolean = false;
    isProductFOS: string;
    isUpsellAllowed: string;
    followUpForRenewal: string;
    agentCommission: string;
    policyCommission: string;
    technicalPricingApplicable: string;
    renewalTechnicalPricingApplicable: string;
    tpExemption: string;
    isTaxSaver: string;
    isVIPPolicy: string;
    tparate: number;
    isPortablePolicy: string;
    isLoadingApplicable: string;
    declinedpool: string;
    validityDate: string;
    pedLoadingApplicable: boolean;
    extraAddOnCoveragesSelectedInRN: string;
    renewalPEP: string;
    medicalLoading: number;
    isRoadSideAssistance: string;
    isValetCare: string;
    valetCareOriginalPrinted: string;
    minimumPaybleAmount: string;
    verticalChannel: string;
    quotevalidityDate: string;
    subChannel: string;
    combiPrintRequired: string;
    isSplitPolicy: string;
    qcPolicy: string;
    isGSTCalc: string;
    stateGstin: string;
    gstinInvoiceNumber: string;
    isCombiProduct: boolean = false;
    parentPolicy: string;
    isReferralDueToCliams: string;
    netPremium: string;
    msgId: string;
    endorsementComments: string;
    dynamicProperties: DynamicProperties;
    coverages: Coverages[] = [];
    attributes: Attributes2;
    proposerDetails: ProposerDetails;
    additionalInfos: AdditionalInfos;
    riskDetails: RiskDetails[] = [];
    previousPolicyDetails: PreviousPolicyDetails;
    posAgentDetails: PosAgentDetails;
    oaAgentDetails: OaAgentDetails = new OaAgentDetails();
    combiInsuredDetails: CombiInsuredDetails;
    endorsementChangeLog: EndorsementChangeLog;
    payment: Payment;
    errMsg: string;
    alertMsg: string;
    endorsementType: string;
    receiptDate: string;
    rsBranchState: string;
    insurableItem: string;
    coveragesForm: CoveragesForm;
    //For Upload Documents in health
    inwardCode: string;
    proposerCode: string;
    //healthIndividuals: Array<HealthInsured> = [];
    noInsured: number;
    quoteType: string;
    combiCampaignSelected: string = '';
    selectedCombiProduct: string = '';
    combiSumInsured: string = '';
    combiSumInsuredType: string = '';
    coverNoteIssueDate: string;
    coverNoteNumber: string;
    proposalNoteNumber: string;
    proposalNoteIssueDate: string;
    policyPortable: string = '';
    isProposerInsured: string = 'No';
    copyPropertyAddressForHome: boolean = false;
    selectedRegion: string = 'India';
    planOption: string;
    selectedRidersList: string = null;
    counterOfferId: string;
    loadingPercentage: string = '0';
    tpaPercent: number;
    tpaCode: string;
    combiPlmProductName: string;
    combiInceptionDate: string;
    combiExpiryDate: string;
    combiPolicyDuration: string;
    combiPlanOption: string;
    masterPlan: string;
    citiAdditionalDetails: CitiAdditionalDetails;
    referalReason: string;
    infoClearedDate: string;
    subPlan: string;
    noLivesCovered: string;
    fraudIndicator: string = 'false';
    fraudReasons: string = null;
    renewalOption: string;
    reasonCode: string;
    reasonText: string;
    uwDetails: UwDetails;
    //homehealth combiSubline
    combiSubline: string;
    combiProductDisplayName: string;
    combiPackageName: string;
    combiPackageDisplayName: string;
    isGroupCampaign: boolean;
    groupName: string;
    otpGenereated: boolean;
    renewalNoticePrintDate: string;
    partnerId: '';
    partnerPwd: '';
    smId: '';
    smState: '';
    smIPadd: '';
    healthQuestionsRequired: string = 'NO';
    remittancePending: boolean;
    serviceProviderInfo: ServiceProviderInfo;
    summaryPageDetails: SummaryPageDetails;
    travelDetails: TravelPolicyDetails;

    initChilds() {
        this.serviceProviderInfo = new ServiceProviderInfo();
        this.proposerDetails = new ProposerDetails();
        this.additionalInfos = new AdditionalInfos();
        this.posAgentDetails = new PosAgentDetails();
        this.oaAgentDetails = new OaAgentDetails();
        this.previousPolicyDetails = new PreviousPolicyDetails();
        this.riskDetails = [];
        this.payment = new Payment();
        this.coveragesForm = new CoveragesForm();
        this.citiAdditionalDetails = new CitiAdditionalDetails();
        this.additionalInfos = new AdditionalInfos();
        this.uwDetails = new UwDetails();
        this.travelDetails = new TravelPolicyDetails();
    }
}

export class TravelPolicyDetails {
    constructor(){
        this.initChilds();
    }
    planId: string='';
    planName: string;
    campaignId: string='';
    campaignName: string;
    policyIssueDate: any;
    policyStartDate: any;
    policyExpiryDate: any;
    noOfDays: number;
    selectedCountries: SelectedCountry[];
    countryGroupName: string;
    countryGroupCode: string='';
    proposer: Proposer;
    productType: string='';
    productName: string;
    corporateCustomer: CorporateCustomer;
    travelInsureds: TravelInsured[] = [new TravelInsured()];
   
    initChilds() {
        this.proposer = new Proposer();
        this.corporateCustomer = new CorporateCustomer();
    }

}
export class TravelInsured {
 
    universityDetails: UniversityDetails = new UniversityDetails();
    sponsorDetails: SponsorDetails = new SponsorDetails();
}


export class UniversityDetails {
    id: string;
    nameofUniversity: string;
    courseName: string;
    address1: string;
    address2: string;
    address3: string;
    city: string;
    state: string;
    country: string;
    tutionFeePerAnnum: string;
}

export class SponsorDetails {
    id: string;
    customerCode: string;
    sameAsProposer: string;
    firstName: string;
    middleName: string;
    lastName: string;
    relationshipToInsured: string;
    address1: string;
    address2: string;
    address3: string;
    city: string;
    state: string;
    country: string;
    dateofBirth: string;
    contactNumber: string;
}
export class Proposer {
    constructor(){
        this.init();
    }
    id: string;
    iscorporate: string;
    partyType: string;
    partyCode: string;
    corporateName: string;
    firstName: string;
    middleName: string;
    lastName: string;
    pdateOfBirth: string;
    gender: string='';
    address1: string;
    address2: string;
    address3: string;
    address4: string;
    city: string;
    state: string;
    pincode: string;
    existingCustomer: boolean;
    corpAddress1: string;
    corpAddress2: string;
    corpAddress3: string;
    corpAddress4: string;
    corpCity: string;
    corpState: string;
    corpPincode: string;
    nomineeId: string;
    corpEmailId: string;
    corpPhoneNumber: string;
    maritalStatus: string='';
    annualIncome: string='';
    occupation: string='';
    occupationOther: string;
    panNumber: string;
    passportNumber: string='';
    gstNumber: string ='';
    corpGstNumber: string;
    travelNominee : TravelNominee;
    init(){
        this.travelNominee = new TravelNominee();
    }

}

export class TravelNominee {
    copyProposerAddressForNominee : boolean;
    id: string;
    iscorporate: string;
    partyType: string;
    partyCode: string;
    firstName: string;
    middleName: string;
    lastName: string;
    corporateName: string;
    pdateOfBirth: string;
    gender: string='';
    address1: string;
    address2: string;
    address3: string;
    address4: string;
    city: string;
    state: string;
    pincode: string;
    relation: string;
    existingCustomer: boolean;
    corpAddress1: string;
    corpAddress2: string;
    corpAddress3: string;
    corpAddress4: string;
    corpCity: string;
    corpState: string;
    corpPincode: string;
    nomineeId: string;
    corpEmailId: string;
    corpPhoneNumber: string;
}

export class CorporateCustomer {
    id: string;
    iscorporate: boolean = true;
    policyId: string;
    policyCode: string;
    email: string;
    contactNumber: string;
    fax: string;
    corporateName: string;
    contactPerson: string;
    address1: string;
    address2: string;
    address3: string;
    address4: string;
    city: string;
    state: string;
    pincode: string;
    corpCustomerProof: string;
    refNumber: string;
    mailingAddress: string;
    coveragePremium: string;
    serviceTaxAmt: string;
    premium: string;
    existingCustomer: boolean;
    businessStatus: string;
    productType: string;
    proposerCode: string;
    parentPolicyEid: string;
    isNewClient: string;
    swachhBharatCess: string;
    krushiKalyanCess: string;
    cgst: string;
    isGSTCalc: string;
    sgst: string;
    igst: string;
    utgst: string;
    cgstRate: string;
    sgstRate: string;
    igstRate: string;
    utgstRate: string;
    corpAddress1: string;
    corpAddress2: string;
    corpAddress3: string;
    corpAddress4: string;
    corpCity: string;
    corpState: string;
    corpPincode: string;
    nomineeId: string;
    corpEmailId: string;
    corpPhoneNumber: string;
    maritalStatus: string='';
    annualIncome: string;
    occupation: string='';
    occupationOther: string;
    panNumber: string;
    passportNumber: string;
    gstNumber: string;
    corpGstNumber: string;
    
}
export class SelectedCountry {
    countryName: string;
    countryCode: string;
}
export class UwDetails {
    constructor() {
        this.initChilds();
    }
    copayPercent: string;
    copayApplicable: string;
    humsStatus: string;
    remarks: string;
    rejectedFor: string;
    decisionDate: string;
    editable: boolean;
    initChilds() {
    }
}

export class AdditionalInfos {
    constructor() {
        this.initChilds();
    }
    additionalInfo: AdditionalInfo[];
    initChilds() {
        this.additionalInfo = [];
    }
}

export class PolicyDetailModel {

    policyDetails = new PolicyDetails();
    combiPolicyDetail: any;
}
export class CoverageDetails {
    policyDetails: PolicyDetails;
}

export class CoveragesForm {
    constructor() {
        this.initChilds();
    }
    dynamicProperties: DynamicProperties[];
    coverages: Coverages[];
    attributes: Attributes[];
    errMsg: string;
    packageName: string;
    packageDisplayName: string;
    inclusionList?: any;
    exclusionList?: any;
    uniDirectionalList?: any;
    initChilds() {
        this.dynamicProperties = [];
        this.coverages = [];
        this.attributes = [];
    }
}

export class HealthQuoteCheckListModel {
    constructor() {
        this.initChilds();
    }
    userName: string;
    save: string;
    healthQuoteCheckListForm: HealthQuoteCheckListForm[];
    initChilds() {
        this.healthQuoteCheckListForm = [];
    }
}

export class HealthQuoteCheckListForm {
    id: string;
    policyId: string;
    question: string;
    isChecked: boolean = false;
    comments: string;
    quoteDetails: string;
    insuredId: number;
    updateBy: string;
    updatedDate: string;
    saved: boolean;
    sNo: number;
}

export class HomeQuoteCheckListModel {
    constructor() {
        this.initChilds();
    }
    userName: string;
    save: string;
    healthQuoteCheckListForm: HealthQuoteCheckListForm[];
    initChilds() {
        this.healthQuoteCheckListForm = [];
    }
}

export class HomeQuoteCheckListForm {
    id: string;
    policyId: string;
    question: string;
    isChecked: boolean = false;
    comments: string;
    quoteDetails: string;
    insuredId: number;
    updateBy: string;
    updatedDate: string;
    saved: boolean;
    sNo: number;
}

export class ServiceProviderInfo {
    serviceProvider: string = "";
    virURL: string = "";
    userName: string = "";
    passWord: string = "";
    loginUserName: string = "";
}

export class SummaryPageDetails {
    editQuote: boolean = false;
    finaliseQuote: boolean = false;
    hideLinks: boolean = false;
    printAutoReceipt: boolean = false;
    printCoverNote: boolean = false;
    printNCDLetter: boolean = false;
    printPAPolicy: boolean = false;
    printPolicy: boolean = false;
    printProposalForm: boolean = false;
    printQRCode: boolean = false;
    printQuote: boolean = false;
    printRenewalNotice: boolean = false;
    printValetCar: boolean = false;
    rsRenewal: boolean = false;
    showaddonlink: boolean = false;
    viewVMCLinks: boolean = false;
}

