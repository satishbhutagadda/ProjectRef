import { ArrayList } from 'ts-collections/index';
import { GAuthority } from './gauthority.model';
export interface IUser{
    //private Attributes myAttrs;
	password: string;
	username: string;
	givenName: string;
	changePasswordNextLogon: boolean;
	cannotChangePassword: boolean;
	passwordNeverExpires: boolean;
	internetAccessAllowed: boolean;
	status: string;
	email: string;
	branches: string[];
	//private List<GAuthority> authorites;
	authorites: ArrayList<GAuthority>;
    //private Map<String, String> mappedBranches = new HashMap<>();
	mappedBranches: Map<string, Array<string>>;
	//let priceListMap : Map<number, Array<string>> = new Map<number, Array<string>>();
	priceListMap: Map<number, Array<string>>;
	//private Map<String, String> visibleBranches = new HashMap<>();
	visibleBranches: Map<string, string>;
	//private Map<String, String> immediateChildBranches = new HashMap<>();
	immediateChildBranches: Map<string, string>;
	type: string;
	partyCode: string;
	branchCode: string;
	subline: ArrayList<String>;
	line: string;
	depositingBranch: string;
	passwordExpires: number ;
	bankCode: string;
	bankName: string;
	empMailId: string;
	campaignCodes: string;
	agentCode: string;
	agentName: string;
	//private Map<String, String> sublineTransactions;
	sublineTransactions: Map<string, string>;
	userCreationFlowStatus: boolean;
	updateProfileActionList: ArrayList<string>;
	
	channels: ArrayList<string>;
	products: string[];
	mods: string[];
	partyChannels: string[];
	directPos: boolean;
	partyType:string;
	fullName:string;
	
}