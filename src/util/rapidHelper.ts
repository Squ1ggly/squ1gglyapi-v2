import { DateTime } from "luxon";
import { ConfidentialClientApplication } from "@azure/msal-node";

interface IWorkflowInputs<T = any> {
    inputs: T;
}

interface IProcessRun extends IListItem {
    title: string;
    process_diagram_id: number;
    ledger_data: object;
    type: string;
    is_complete: any;
    diagram_data: any;
}

interface IFile {
    FileNameTemplate: string;
    Required: boolean;
    DriveId: string;
    FolderId: string;
    FilePath: string;
    isAdhoc: true;
    Files: IFile[];
}

interface IEmbeddedFile {
    Label: string;
    FileNameTemplate: string;
    Required: boolean;
    DriveId: string;
    FolderId: string;
    FilePath: string;
    isAdhoc: boolean;
    Files: IFile[];
}

type TModeFlags = 1 | 2 | 3 | 4 | 5 | 6 | 7;
interface IPermission {
    mode_flags: TModeFlags;
    oid: string;
    principal_id: number;
    type: "SecurityGroup" | "Application" | "User" | "Unified" | "Role";
}

/* TEMP MANUAL IMPORT FROM DATA MODEL DUE TO NPM ISSUES */
export interface IListItem {
    id?: number;
    author_id?: number;
    author?: string;
    editor_id?: number;
    editor?: string;
    created?: string;
    modified?: string;
    deleted?: string | null;
    drive_id?: string;
    folder_id?: string;
    Permissions?: IPermission[];
    LinkedItems?: any[];
    LinkedItemsToAdd?: string[];
    sys_type_id?: number;
    sys_external_id?: string | number;
    parent_id?: number;
    embedded_files?: IEmbeddedFile[] | string;
    __metadata?: IListItemMetadata;
}

export interface IListItemDynamic extends IListItem {
    [k: string]: any;
}

export interface IListItemMetadata {
    type: string;
}

export interface IResultLog {
    elementId: string;
    timestamp: string;
    level: string;
    message: string;
}
export interface IResultSummary {
    status: ResultStatus;
    cancelled: number;
    failed: number;
    skipped: number;
    waiting: number;
    warnings: number;
}
export interface IResultItem {
    title: string;
    data: any;
    processing_status: ProcessingStatus;
    result: ResultStatus;
    started_date: string;
    completed_date: string;
    debug: {
        element: {
            id: string;
            name: string;
            namespace: string;
        };
        tracking: {
            trackers: any[];
            incomingTokens: any[];
            outgoingTokens: any[];
        };
        logs: IResultLog[];
        testItems: any[];
    };
}
export interface ITestPlanResult {
    summary: IResultSummary;
    diagram: number;
    title: string;
    parent: any;
    items: IResultItem[];
}
export interface ITestPlan {
    testPlan: {
        startElement: string;
        elements: ITestPlanElement[];
        inputs: ITestPlanElementParameter[];
        outputs: ITestPlanElementParameter[];
    };
}
export interface ITestPlanElementParameter extends Record<string, any> {
    key: string;
    value: string | number;
}
export interface ITestPlanElement {
    id: string;
    order: number;
    testPlan?: number;
    properties: Record<string, any>;
    item: Record<string, any>;
    skip: boolean;
    inputs: ITestPlanElementParameter[];
    outputs: ITestPlanElementParameter[];
}
export declare type ProcessingStatus =
    | "Queued"
    | "Processing"
    | "Completed"
    | "Stalled"
    | "Discarded"
    | "Failed"
    | "Cancelled"
    | "Scheduled"
    | "Not Set";
export declare type ResultStatus =
    | "Unprocessed"
    | "Processing"
    | "Waiting"
    | "Completed"
    | "Passed"
    | "Condition Failed"
    | "Failed"
    | "Cancelled"
    | "Scheduled"
    | "Skipped";

export interface IListItemHistory {
    id: number;
    item_id: number;
    editor_id: number;
    editor: string;
    modified: Date;
}

/* END OF TEMP DATA MODEL IMPORT */

export interface ISiteStub {
    tenant: string;
    site: string;
    environment: string;
}

//Helper interface for handling Java Web Tokens
interface IJWT {
    token_type: string;
    expires_in: number;
    ext_expires_in: number;
    access_token: string;
}

//Basic interface for handling Minilith responses contained in a value
interface IValueResponse {
    value: IListItem[];
}

//Test Plan item for the simulate endpoint
export interface ITestItem extends IListItem {
    test_plan: {
        testPlan: ITestPlan;
    };
    result: ITestPlanResult;
    process_diagram_id: number;
}

//Error message shape returned when fetching items from RAPID
interface IErrorMessage {
    name: string;
    message: string;
}

interface IMenuItem {
    id: string;
}

//Site file that defines an entire site
export interface ISiteFile {
    Access: object;
    AdditionalGroups: object;
    Bundles: object;
    DataSources: object;
    Drives: object;
    ExperienceVersions: object;
    FolderInheritance: object;
    Forms: object;
    InheritLinks: object;
    Lists: IEntity[];
    Menus: IMenuItem[];
    OrganizationWideEmail: {
        enabled: boolean;
        mailbox: string;
    };
    Pages: object;
    Permissions: object;
    PrimaryGroup: object;
    SiteName: string;
    SupportContact: {
        name: string;
        email: string;
        phone: string;
    };
    parentSiteId: string;
}

export interface IEntity {
    ListName: string;
    ListNameSingular: string;
    NewItemPage: string;
    Fields: IField[];
    Table: string;
    Searchable: boolean;
    Settings: {
        Icon: string;
    };
    TitleField: string;
    DefaultPermissions: any;
    PlaceholderPermissions: any;
    InheritLinks: string[];
    Extends: string;
}

export interface IPage {
    attributes: {
        itemType: number;
        linkItemId: number;
        linkItemType: number;
        pageId: number;
    };
    body: object;
    id: string;
    jumbotronEnabled: boolean;
    layouts: object;
}

export interface IField {
    ColumnName: string;
    FieldType: string;
    DefaultValue?: any;
    Description?: string;
    Searchable: boolean;
    Settings: IFieldSettings;
    SystemManaged: boolean;
    Title: string;
    TitleField: boolean;
}

interface IFieldSettings {
    Choices?: any[];
    DefaultView?: string;
    Query?: string;
    DisplayAs?: string;
    LookupField?: string;
    LookupList?: string;
    LookupBindings?: {
        Fields?: string[];
        LookupValueSource?: string;
    }[];
}

interface MyInterface {
    id?: number;
    drive_id: string;
    drive_item_id: string;
    thumbnail?: null | string;
}

async function exponentialWait(
    left: number,
    right: number,
    milliseconds: number,
): Promise<void> {
    await new Promise((r) => setTimeout(r, left ** right * milliseconds));
}

//Definition of reference fields (fields that can rely on other entities)
const REFERENCEFIELD = [
    "Lookup",
    "MultiLookup",
    "Subquery",
    "Computed",
    "User",
];

/**
 * Returns a list of fields that are not related to another entity (Lookup, Multi-Lookup, Subquery & Computed)
 * @param baseEntity The entity definition from the site file we are processing
 */
function extractNonReferenceFields(baseEntity: IEntity): IField[] {
    let nonReferenceFields: IField[] = [];
    for (let field of baseEntity.Fields) {
        if (!REFERENCEFIELD.includes(field.FieldType)) {
            //Does not include
            nonReferenceFields.push(field);
        }
    }
    return nonReferenceFields;
}

/**
 * Returns a list of fields that are related to another entity (Lookup, Multi-Lookup, Subquery & Computed)
 * @param baseEntity  The entity definition from the site file we are processing
 */
function extractReferenceFields(baseEntity: IEntity): IField[] {
    let ReferenceFields: IField[] = [];
    for (let field of baseEntity.Fields) {
        if (REFERENCEFIELD.includes(field.FieldType)) {
            //Does include
            ReferenceFields.push(field);
        }
    }
    return ReferenceFields;
}

/**
 * Recursively finds any page elements that are Reports and blanks their configuration
 * Prevents information stored in reports bleeding across to deployed sites
 * @param pageBody : JSON representation of a page or page element
 */
function removeReportConfigFromPage(pageBody: any) {
    //Check my children
    if (!!pageBody?.children) {
        pageBody.children.forEach((e: any) => removeReportConfigFromPage(e));
    }
    //If we are a report
    if (pageBody?.type == "Report") {
        pageBody.attributes.config.report = {}; //Remove the configuration for the report
    }
}

export class RAPIDAPIHelper {
    authToken: string;
    CLIENT_ID: string;
    CLIENT_SECRET: string;
    AUTHORITY_URL: string;
    siteStub: ISiteStub;
    siteFile: ISiteFile;
    retryCount: number = 0;
    #retryAmount: number = 3;

    /**
     * @param siteDetails Environment should be prod | test | local
     */
    constructor(
        siteDetails: ISiteStub,
        CLIENT_ID: string,
        CLIENT_SECRET: string,
        retryAmount: number = 3,
    ) {
        this.authToken = "Uninitialized";
        this.AUTHORITY_URL = `${process.env.AUTHORITY_URL}${siteDetails.tenant}.onmicrosoft.com`;
        this.CLIENT_ID = CLIENT_ID;
        this.CLIENT_SECRET = CLIENT_SECRET;
        this.siteStub = siteDetails;
        if (!this.siteStub.environment) {
            this.siteStub.environment = "test";
        }
        this.siteFile = {} as ISiteFile;
        if (retryAmount < 100) {
            this.#retryAmount = retryAmount;
        }
    }

    /**
     * Generates and applies a bearer token for the current site
     */
    private async setApplicationToken(): Promise<void> {
        const config = {
            auth: {
                authority: this.AUTHORITY_URL,
                clientId: this.CLIENT_ID,
                clientSecret: this.CLIENT_SECRET,
            },
        };
        const clientApp = new ConfidentialClientApplication(config);

        const token = await clientApp.acquireTokenByClientCredential({
            scopes: ["cd5db0ec-1419-4ae6-9434-21cfb83fc42d/.default"],
        });

        this.authToken = "Bearer " + token?.accessToken;
    }

    /**
     * Generates the base URL for the current environment and site
     * @returns Base URL for the current environment and site
     */
    generateBaseURL(): string {
        //Local
        if (
            this.siteStub.environment === "local" ||
            this.siteStub.environment === "localhost:8080" ||
            this.siteStub.environment === "localhost"
        ) {
            return `http://localhost:8080/${encodeURIComponent(this.siteStub.tenant)}/${encodeURIComponent(this.siteStub.site)}`;
        }
        //Test
        if (
            this.siteStub.environment === "test" ||
            this.siteStub.environment === "api-test"
        ) {
            return `https://api-test.rapidplatform.com/api/${encodeURIComponent(this.siteStub.tenant)}/${encodeURIComponent(this.siteStub.site)}`;
        }
        //App
        if (
            this.siteStub.environment === "prod" ||
            this.siteStub.environment === "production" ||
            this.siteStub.environment === "api" ||
            this.siteStub.environment === "app"
        ) {
            return `https://api.rapidplatform.com/api/${encodeURIComponent(this.siteStub.tenant)}/${encodeURIComponent(this.siteStub.site)}`;
        }
        //Fallback to given environment
        console.warn(
            `Environment did not match known patterns, using ${this.siteStub.environment}`,
        );
        return `https://${this.siteStub.environment}.rapidplatform.com/api/${encodeURIComponent(this.siteStub.tenant)}/${encodeURIComponent(
            this.siteStub.site,
        )}`;
    }

    /**
     * Generates URL for fetching a given list
     * @param listName : List name to be targeted
     * @returns URL targeting the given list
     */
    generateListURL(listName: string): string {
        return `${this.generateBaseURL()}/lists/${encodeURIComponent(listName)}/All$/items`;
    }

    /**
     * Generates URL for creating an item of a given list
     * @param listName List name to be targeted
     * @returns
     */
    generateListCreateURL(listName: string): string {
        return `${this.generateBaseURL()}/lists/${encodeURIComponent(listName)}/items`;
    }

    /**
     * Generates a fetch/update URL for an item on a given list
     * @param listName List name to be targeted
     * @param id ID of the item to be targeted
     * @returns URL targeting a given item on a given list
     */
    generateItemURL(listName: string, id: number): string {
        return `${this.generateBaseURL()}/lists/${encodeURIComponent(listName)}/items/${id}`;
    }

    /**
     * Generates the History URL for a given item on a given list
     * @param listName List name to be targeted
     * @param id ID of the item to be targeted
     * @returns URL targeting the history endpoint for a given item on a given list
     */
    generateItemHistoryTableURL(listName: string, id: number): string {
        return `${this.generateBaseURL()}/lists/${encodeURIComponent(listName)}/items/${id}/history`;
    }

    generateItemHistoryURL(
        listName: string,
        id: number,
        editDate: string,
    ): string {
        return `${this.generateBaseURL()}/lists/${encodeURIComponent(listName)}/items/${id}?at=${editDate}`;
    }

    /**
     * Generates URL for fetching a given list
     * @param listName : List name to be targeted
     * @returns URL targeting the given list
     */
    generateListURLWithView(listName: string, view: string): string {
        return `${this.generateBaseURL()}/lists/${encodeURIComponent(listName)}/${view}/items`;
    }

    generatePermissionUrl(targetList: string, targetItemId: number) {
        return this.generateItemURL(targetList, targetItemId) + "/permissions";
    }

    /**
     * Adds URL options for Filter, Select and Skip to item fetch URLs
     * @param url Initial URL we are mutating
     * @param filter Optional : An OData filter query
     * @param select Optional : A select list of columns to add fetch
     * @param skip Optional : How many items to skip in pagination scenarios
     * @returns Mutated URL with options added
     */
    generateListURLOptions(
        url: string,
        filter: string | null = null,
        select: string | null = null,
        skip: number = 0,
    ): string {
        //Handle if we already have query parameters in the URL
        let replaceChar = "";
        if (url.indexOf("?") < 0) {
            replaceChar = "?";
        } else {
            replaceChar = "&";
        }

        //Handle optional filter and select statements
        if (!!filter && !!select) {
            url = `${url}${replaceChar}$filter=${encodeURIComponent(filter)}&$select=${encodeURIComponent(select)}`;
            replaceChar = "&";
        } else if (!!filter && !select) {
            url = `${url}${replaceChar}$filter=${encodeURIComponent(filter)}`;
            replaceChar = "&";
        } else if (!filter && !!select) {
            url = `${url}${replaceChar}$select=${encodeURIComponent(select)}`;
            replaceChar = "&";
        }
        //Add skip if required
        if (skip > 0) {
            url = `${url}${replaceChar}$skip=${skip}`;
        }

        return url;
    }

    /**
     * Creates a Minilith request that returns an item profile
     * @param url URL to send top
     * @param errorId Caller ID to log errors from
     * @param method Optional : Method of request, defaults GET
     * @param bodyIn Optional : Body of request
     * @returns List Item
     */
    async requestItem<T = IListItem>(
        url: string,
        errorId: string,
        method: string = "GET",
        bodyIn: string | null = null,
    ): Promise<T> {
        if (this.authToken === "Uninitialized") {
            await this.setApplicationToken();
        }
        let response = await fetch(url, {
            method: method,
            headers: {
                Authorization: this.authToken,
                "Content-Type": "application/json",
            },
            body: bodyIn,
        });
        if (!response.ok && this.retryCount < this.#retryAmount) {
            console.error(
                "Failed request, retrying!",
                `Error in RequestItem : ${await response.text()}`,
            );
            await this.setApplicationToken();
            this.retryCount += 1;
            await exponentialWait(this.retryCount, this.#retryAmount, 125);
            return await this.requestItem<T>(url, errorId, method, bodyIn);
        } else if (!response.ok) {
            const err = (await response?.text()) ?? "";
            throw new Error(`Exceeded the retry limit : ${err}`);
        }
        this.retryCount = 0;
        const responseIsJson = response.headers
            .get("content-type")
            ?.includes("application/json");
        if (!responseIsJson) {
            return {
                message: await response?.text(),
            } as T;
        }

        const resp = await response.json();
        if (resp.value) {
            return resp.value as T;
        } else {
            return resp as T;
        }
    }

    /**
     * Fetches a single item from a given list
     * @param listName The list being fetched from
     * @param id The ID of the item to be fetched
     * @returns The item profile of the fetched item
     */
    async fetchItem<T = IListItem>(listName: string, id: number): Promise<T> {
        return await this.requestItem<T>(
            this.generateItemURL(listName, id),
            "fetchItem",
            "GET",
            null,
        );
    }

    /**
     * Fetches a page of items from a given list
     * @param listName The list we are fetching items from
     * @param view The view we are fetching from
     * @param filter Optional : An OData filter expression
     * @param select Optional : A select statement of columns to return
     * @param skip Optional : How many items to skip down for pagination
     * @returns Array of List Items, up to one page (250)
     */
    async fetchItemsWithView<T = IListItem[]>(
        listName: string,
        view: string,
        filter: string | null = null,
        select: string | null = null,
        skip: number = 0,
    ): Promise<T> {
        let url = this.generateListURLWithView(listName, view);
        url = this.generateListURLOptions(url, filter, select, skip);
        return await this.requestItem<T>(
            url,
            "fetchItemsWithView",
            "GET",
            null,
        );
    }

    /**
     * Returns the item history table for a given item
     * @param listName The list the item history we are fetching for
     * @param id The item we are fetching the history for
     * @returns The item history
     */
    async fetchItemHistoryTable(
        listName: string,
        id: number,
    ): Promise<IListItemHistory[]> {
        //TODO : This probably has a different return shape
        if (this.authToken === "Uninitialized") {
            await this.setApplicationToken();
        }
        const url = this.generateItemHistoryTableURL(listName, id);
        return await this.requestItem<IListItemHistory[]>(
            url,
            "fetchItemHistoryTable",
            "GET",
        );
    }

    /**
     * Fetches the history table for a given item at a given time
     * @param listName The list to fetch the item history table from
     * @param id The item we are getting the history table of
     * @param modifyDate The cut-off date we want to regard for history items
     * @returns The history table for the given item
     */
    async fetchItemFromHistory<T = IListItem>(
        listName: string,
        id: number,
        modifyDate: DateTime = {} as DateTime,
    ): Promise<T> {
        const historyDate = modifyDate?.setZone("UTC+0").toISO() || "";
        return await this.requestItem<T>(
            this.generateItemHistoryURL(listName, id, historyDate),
            "fetchItemFromHistory",
        );
    }

    /**
     * Fetches a page of items from a given list
     * @param listName The list we are fetching items from
     * @param filter Optional : An OData filter expression
     * @param select Optional : A select statement of columns to return
     * @param skip Optional : How many items to skip down for pagination
     * @returns Array of List Items, up to one page (250)
     */
    async fetchItems<T = IListItem[]>(
        listName: string,
        filter: string | null = null,
        select: string | null = null,
        skip: number = 0,
    ): Promise<T> {
        let url = this.generateListURL(listName);
        url = this.generateListURLOptions(url, filter, select, skip);

        return await this.requestItem<T>(url, "fetchItems", "GET", null);
    }

    async updatePermissions(
        targetList: string,
        targetItemId: number,
        permissions: IPermission[],
    ): Promise<void> {
        const url = this.generatePermissionUrl(targetList, targetItemId);
        await this.requestItem(
            url,
            "updatePermissions",
            "PUT",
            JSON.stringify(permissions),
        );
    }

    async getPermissions(
        targetList: string,
        targetItemId: number,
    ): Promise<IPermission[]> {
        const url = this.generatePermissionUrl(targetList, targetItemId);
        const response = await this.requestItem<IPermission[]>(
            url,
            "getPermissions",
            "GET",
        );
        return response;
    }

    /**
     * Fetches all items from a given list
     * @param listName The list we are fetching items from
     * @param filter Optional : An OData filter expression
     * @returns Array of List Items
     */
    async fetchAllItems<T = IListItem[]>(
        listName: string,
        filter: string | null = null,
        select: string | null = null,
    ): Promise<T> {
        const items = await this.fetchItems<IListItem[]>(
            listName,
            filter,
            select,
        );
        let isNotComplete = items.length === 250 ? true : false;
        while (isNotComplete) {
            const nextPage = await this.fetchItems<IListItem[]>(
                listName,
                filter,
                select,
                items.length,
            );
            if (nextPage.length > 0) {
                items.push(...nextPage);
            } else {
                isNotComplete = false;
            }
        }
        return items as T;
    }

    /**
     * Fetches items of a given list linked to a given item
     * @param listName The list name of the linked list we want to fetch from
     * @param linkedTo The list name of the item we want to fetched linked items from
     * @param linkedToId The ID of the item we want to fetch linked items from
     * @param filter Optional : An OData filter expression
     * @param select Optional : A select statement of columns to return
     * @param skip Optional : How many items to skip down for pagination
     * @returns Array of List Items linked to the given item
     */
    async fetchItemsLinked<T = IListItem[]>(
        listName: string,
        linkedTo: string,
        linkedToId: number,
        filter: string | null = null,
        select: string | null = null,
        skip: number = 0,
    ): Promise<T> {
        let url = `${this.generateListURL(listName)}?linkedTo=${linkedTo}/${linkedToId}`;
        url = this.generateListURLOptions(url, filter, select, skip);

        return await this.requestItem<T>(url, "fetchItemsLinked", "GET", null);
    }

    /**
     * Fetches all items of a given list linked to a given item
     * @param listName The list name of the linked list we want to fetch from
     * @param linkedTo The list name of the item we want to fetched linked items from
     * @param linkedToId The ID of the item we want to fetch linked items from
     * @param filter Optional : An OData filter expression
     * @returns Array of List Items linked to the given item
     */
    async fetchAllItemsLinked<T = IListItem[]>(
        listName: string,
        linkedTo: string,
        linkedToId: number,
        filter: string | null = null,
        select: string | null = null,
    ): Promise<T> {
        const items = await this.fetchItemsLinked<IListItem[]>(
            listName,
            linkedTo,
            linkedToId,
            filter,
            select,
        );
        let isNotComplete = items.length === 250 ? true : false;
        while (isNotComplete) {
            const nextPage = await this.fetchItemsLinked<IListItem[]>(
                listName,
                linkedTo,
                linkedToId,
                filter,
                select,
                items.length,
            );
            if (nextPage.length > 0) {
                items.push(...nextPage);
            } else {
                isNotComplete = false;
            }
        }
        return items as T;
    }

    /**
     * Creates an item on the given list
     * @param listName The list we are creating an item of
     * @param bodyIn The item profile we are creating
     * @returns The created item profile
     */
    async createItem<T = IListItem[]>(
        listName: string,
        bodyIn: string,
        fireWebhooks: boolean = false,
    ): Promise<T> {
        if (this.authToken === "Uninitialized") {
            await this.setApplicationToken();
        }
        const url = `${this.generateListCreateURL(listName)}?webhooks=${fireWebhooks}`;
        const createdItem = await this.requestItem<T>(
            url,
            "createItem",
            "POST",
            bodyIn,
        );
        return createdItem;
    }

    /**
     * Creates items in multiple iterative pages of a given block size for large scale importing
     * @param itemsToCreate List item array of things to create
     * @param blockSize The size of the page we are creating at a time
     * @param listName What list we are creating against
     * @returns All created items across each page
     */
    async createItemsPagination<T = IListItem[]>(
        itemsToCreate: IListItem[],
        blockSize: number,
        listName: string,
    ): Promise<T> {
        console.log(`Started creating items for list ${listName}`);
        const returnItems = [];
        const totalItems = itemsToCreate.length;
        let startIndex = 0;
        while (startIndex < totalItems) {
            const itemsBlock = itemsToCreate.slice(
                startIndex,
                startIndex + blockSize,
            );
            const createdItems = await this.createItem<IListItem[]>(
                listName,
                JSON.stringify(itemsBlock),
            );
            returnItems.push(...createdItems);
            startIndex += blockSize;
        }
        console.log(`Completed creating items for list ${listName}`);
        return returnItems as T;
    }

    async createAttachment<T = IListItem[]>(
        listName: string,
        itemId: number,
        attachmentArray: MyInterface[],
    ): Promise<T> {
        const url =
            this.generateListCreateURL(listName) + `/${itemId}/attachments`;
        const createdItem = await this.requestItem<T>(
            url,
            "createAttachment",
            "POST",
            JSON.stringify(attachmentArray),
        );
        return createdItem;
    }

    /**
     * Updates a given item on a list
     * @param listName The list we are updating an item from
     * @param id The item Id we are updating
     * @param bodyIn The new keys we are assigning the updated item
     * @returns The newly updated items' profile
     */
    async updateItem<T = IListItem>(
        listName: string,
        id: number,
        bodyIn: string,
        fireWebhooks: boolean = false,
    ): Promise<T> {
        let url = `${this.generateItemURL(listName, id)}?webhooks=${fireWebhooks}`;

        const updatedItem = await this.requestItem<T>(
            url,
            "updateItem",
            "PUT",
            bodyIn,
        );
        return updatedItem;
    }

    /**
     * Deletes a given item
     * @param listName The list we are updating an item from
     * @param id The item Id we are updating
     * @returns The newly updated items' profile
     */
    async deleteItem<T = IListItem>(
        listName: string,
        id: number,
        fireWebhooks: boolean = false,
    ): Promise<T> {
        let url = `${this.generateItemURL(listName, id)}?webhooks=${fireWebhooks}`;
        const returnValue = await this.requestItem<T>(
            url,
            "deleteItem",
            "DELETE",
        );
        return returnValue;
    }

    /**
     * Executes a test plan simulation and returns the result
     * @param testPlan The test plan to be executed
     * @param diagramId The diagram the plan is to be executed against, will be fetched from the database
     * @returns The result of the simulation
     */
    async simulateTestPlan(
        inTestPlan: ITestItem,
        diagramId: number,
    ): Promise<ITestPlanResult> {
        if (this.authToken === "Uninitialized") {
            await this.setApplicationToken();
        }
        let url = `${this.generateBaseURL()}/workflow/test/${diagramId}`;
        let myBody = await JSON.stringify(inTestPlan.test_plan);
        let response = await fetch(url, {
            method: "POST",
            headers: {
                Authorization: this.authToken,
                "Content-Type": "application/json",
            },
            body: myBody,
        });
        if (response.ok) {
            let resp = (await response.json()) as ITestPlanResult;
            return resp;
        } else {
            let errorMsg = await response.text();
            console.error(
                `Error in RAPID simulateTestPlan with message ${errorMsg}`,
            );
            throw errorMsg;
        }
    }

    /**
     * TODO : Finish this + typings
     * Install an entity definition into the target site
     * @param entity
     * @returns
     */
    async installEntity(entity: object): Promise<boolean> {
        if (this.authToken === "Uninitialized") {
            await this.setApplicationToken();
        }
        const url = `${this.generateBaseURL()}/lists`;
        await this.requestItem(
            url,
            "installEntity",
            "POST",
            JSON.stringify(entity),
        );
        return true;
    }

    /**
     * Installs a single field into the target entity
     * @param {object} field : Field definition to be installed
     * @param {string} entity : Target entity that the field is being installed against
     * @returns {boolean} true on success (?)
     */
    async installField(field: object, entity: string): Promise<boolean> {
        if (this.authToken === "Uninitialized") {
            await this.setApplicationToken();
        }
        let url = `${this.generateBaseURL()}/lists/${entity}/fields`;
        await this.requestItem(
            url,
            "installField",
            "POST",
            JSON.stringify(field),
        );
        return true;
    }

    /**
     * Installs a page into the target site, will overwrite existing pages
     * @param {string} pageName : The page name being installed
     * @param {object} page : The page data being installed
     * @returns true on success (?)
     */
    async installPage(pageName: string, page: object) {
        if (this.authToken === "Uninitialized") {
            await this.setApplicationToken();
        }
        let url = `${this.generateBaseURL()}/pages/Explorer/${pageName}`;
        await this.requestItem(url, "installPage", "PUT", JSON.stringify(page));
        return true;
    }

    /**
     * Replaces the Explorer Menu with the given menu object
     * @param menu : A RAPID Sidebar menu object
     */
    async installMenu(menu: object) {
        if (this.authToken === "Uninitialized") {
            await this.setApplicationToken();
        }
        let url = `${this.generateBaseURL()}/menus/Explorer Sidebar`;
        await this.requestItem(url, "installMenu", "PUT", JSON.stringify(menu));
        return true;
    }

    /**
     * Fetches the site file from the current site, also sets the helper site file internally
     * @returns {object} The site file
     */
    async getSiteFile(): Promise<ISiteFile> {
        if (this.authToken === "Uninitialized") {
            await this.setApplicationToken();
        }
        const url = `${this.generateBaseURL()}`;
        return (this.siteFile = await this.requestItem(
            url,
            "getSiteFile",
            "GET",
        ));
    }

    /**
     * Fetches all pages on the current site
     * @returns {object[]} All pages for the current site
     */
    async getPages() {
        if (this.authToken === "Uninitialized") {
            await this.setApplicationToken();
        }
        const url = `${this.generateBaseURL()}/pages/Explorer`;
        return await this.requestItem(url, "getPages", "GET");
    }

    /**
     * Adds a view to the current site
     * @param {string} list : The target list the view is on
     * @param {object} view : The view configuration
     * @returns {response} The created view response
     */
    async createView(list: string, view: object): Promise<any> {
        if (this.authToken === "Uninitialized") {
            await this.setApplicationToken();
        }
        const url = `${this.generateBaseURL()}/lists/${list}`;
        return await this.requestItem(
            url,
            "createView",
            "POST",
            JSON.stringify(view),
        );
    }

    /**
     * Updates a view on the current site
     * @param {string} list : The target list the view is on
     * @param {object} view : The view configuration
     * @returns {response} The updated view response
     */
    async updateView(list: string, view: any): Promise<any> {
        if (this.authToken === "Uninitialized") {
            await this.setApplicationToken();
        }
        view.ExtraFilterExpression = view.ExtraFilterExpression ?? null;
        view.FilterExpression = view.FilterExpression ?? null;
        const url = `${this.generateBaseURL()}/lists/${list}/${view.Title}`;
        return await this.requestItem(
            url,
            "updateView",
            "PUT",
            JSON.stringify(view),
        );
    }

    /**
     * Fetches the full list configuration including the data sources but not pages
     * @param list : The list we are fetching configuration for
     * @returns {object} : The list configuration from the site file
     */
    async getListConfig(list: string) {
        if (this.authToken === "Uninitialized") {
            await this.setApplicationToken();
        }
        const url = `${this.generateBaseURL()}/lists/${list}`;
        return await this.requestItem(url, "getListConfig", "GET");
    }

    /**
     * Adds or overrides a menu into the target site
     * @param menu : The menu configuration being installed
     */
    async createMenu(menu: IMenuItem): Promise<void> {
        if (this.authToken === "Uninitialized") {
            await this.setApplicationToken();
        }
        const url = `${this.generateBaseURL()}/menus/${menu.id}`;
        return await this.requestItem(
            url,
            "createMenu",
            "POST",
            JSON.stringify(menu),
        );
    }

    /**
     * Requests a repair for the current site
     */
    async repairDatabase(): Promise<void> {
        if (this.authToken === "Uninitialized") {
            await this.setApplicationToken();
        }
        const url = `${this.generateBaseURL()}/reinstall`;
        return await this.requestItem(url, "repairDatabase", "POST");
    }

    /**
     * Iterates through a given list of entities and uploads them to the target site defined by the helper
     * Splits processing into four steps
     * - Base Entities without relational fields
     * - Inherited Entities without relation fields
     * - Updating Base Entities with their relational fields
     * - Updating Inherited Entities with their relation fields
     * Relation fields are defined by the REFERENCEFIELD array
     * @param {IEntity[]} ListFolder The list definitions we are installing
     */
    async installEntities(Lists: IEntity[]): Promise<void> {
        //Update this to return the IList[]

        //Iterate over the lists in the data directory and pull together a to-do list
        let baseLists: IEntity[] = [];
        let subLists: IEntity[] = [];

        //Break the list into base types and sub-types
        for (let list of Lists) {
            if (!!list?.Extends) {
                subLists.push(list);
            } else {
                baseLists.push(list);
            }
        }

        //Generate stub of each base entity and install it to the site
        for (const baseList of baseLists) {
            let baseStub: IEntity = Object.assign({}, baseList) as IEntity;

            baseStub.Fields = extractNonReferenceFields(baseStub);
            console.info(
                `Installing base stub for ${baseList.ListNameSingular}`,
            );
            await this.installEntity(baseStub);
        }

        //Generate the stub of each inherited entity and install it to the site
        for (const subList of subLists) {
            let subStub: IEntity = Object.assign({}, subList) as IEntity;

            subStub.Fields = extractNonReferenceFields(subStub);
            console.info(
                `Installing inherited stub for ${subStub.ListNameSingular}`,
            );
            await this.installEntity(subStub);
        }

        //Iterate through the installed entities and add the lookups back in
        for (const baseList of baseLists) {
            let fieldsToAdd = extractReferenceFields(baseList);
            console.info(
                `Adding reference fields for base ${baseList.ListNameSingular}`,
            );
            for (const field of fieldsToAdd) {
                await this.installField(field, baseList.ListNameSingular);
            }
        }
        for (const subList of subLists) {
            let fieldsToAdd = extractReferenceFields(subList);
            console.info(
                `Adding reference fields for inherited ${subList.ListNameSingular}`,
            );
            for (const field of fieldsToAdd) {
                await this.installField(field, subList.ListNameSingular);
            }
        }
    }

    /**
     * Installs the given set of pages into the target site
     * @param {IPage[]} pages The page definitions we are installing
     * TODO: Complete conversion from file reading to passed arguments like Install Entities
     *
     */
    async installPages(pages: IPage[]) {
        for (const pageFileName of pages) {
            await this.installPage(pageFileName.id, pageFileName);
        }
    }

    /**
     * Manually starts a process diagram with given inputs
     * @param {number} processId - The diagram we are executing
     * @param {string} elementId - The StartEvent (or other element) we are starting from
     * @param {T} inputs - [OPTIONAL] The inputs required for this particular process diagram with arbitrary typing
     * @returns {IListItem} - The process run created on successful execution
     */
    async executeWorkflowV2<T = any>(
        processId: number,
        elementId: string,
        inputs?: IWorkflowInputs<T>,
    ): Promise<IProcessRun> {
        if (this.authToken === "Uninitialized") {
            await this.setApplicationToken();
        }
        const url = `${this.generateBaseURL()}/workflow/v2/${processId}/execute?${elementId}`;
        return await this.requestItem<IProcessRun>(
            url,
            "executeWorkflowV2",
            "POST",
            JSON.stringify(inputs),
        );
    }

    /**
     * WARNING:
     * This function will fetch the full item profiles of items, this is achieved by fetching the items individually.
     * Due to this the function is incredibly slow since its  1 + p + n request where p is the number of pages that
     * had to be fetched and n is the number of items.
     * @param ListName
     * @param filter
     * @returns
     */
    async fetchFullItems<T = IListItem[]>(
        ListName: string,
        filter: string = "",
    ): Promise<T> {
        const items = await this.fetchAllItems(ListName, filter);
        const returnArr = [];
        for (const item of items) {
            if (!item.__metadata?.type || !item.id) {
                throw new Error("Failed no metadata type or id");
            }
            const fullItem = await this.fetchItem(
                item?.__metadata?.type,
                item.id,
            );
            returnArr.push(fullItem);
        }
        return returnArr as T;
    }

    /**
     * WARNING:
     * This function will fetch the full item profiles of items, this is achieved by fetching the items individually.
     * Due to this the function is incredibly slow since its  1 + p + n request where p is the number of pages that
     * had to be fetched and n is the number of items.
     * @param listName
     * @param linkedTo
     * @param linkedToId
     * @param filter
     * @returns
     */
    async fetchFullItemsLinked<T = IListItem[]>(
        listName: string,
        linkedTo: string,
        linkedToId: number,
        filter: string = "",
    ): Promise<T> {
        const items = await this.fetchAllItemsLinked(
            listName,
            linkedTo,
            linkedToId,
            filter,
        );
        const returnArr = [];
        for (const item of items) {
            if (!item.__metadata?.type || !item.id) {
                throw new Error("Failed no metadata type or id");
            }
            const fullItem = await this.fetchItem(
                item.__metadata.type,
                item.id,
            );
            returnArr.push(fullItem);
        }
        return returnArr as T;
    }

    /**
     * Removes all universal links for a given item
     * @param item The item we are removing links from, expects at least id and __metadata.type
     */
    async removeUniversalLinksForItem(
        item: IListItem,
        columnName: string | null = null,
    ): Promise<void> {
        console.warn(
            `Removing universal links for item ${item.id} on list ${item?.__metadata?.type}`,
        );
        if (!item?.__metadata?.type || !item.id) {
            throw new Error("Cannot proceed when no metadata type or id");
        }
        const blockSize = 250;
        const fullItem = await this.fetchItem(item.__metadata.type, item.id);
        if (!fullItem?.LinkedItems || !fullItem.id) {
            throw new Error("Cannot proceed when no metadata type or id");
        }
        let totalLinks = fullItem.LinkedItems.length;
        let startIndex = 0;
        let linkedItems = fullItem.LinkedItems;
        if (!!columnName) {
            linkedItems = linkedItems.filter((e) => !!e[columnName]);
            totalLinks = linkedItems.length;
        }
        while (startIndex < totalLinks) {
            const itemsBlock = linkedItems.slice(
                startIndex,
                startIndex + blockSize,
            );
            let ids = itemsBlock.map((e) => e.id);
            await this.updateItem(
                item.__metadata.type,
                item.id,
                JSON.stringify({ LinkedItemsToRemove: ids }),
            );
            console.info(`Done ${startIndex + blockSize} out of ${totalLinks}`);
            startIndex += blockSize;
        }
        console.warn(
            `Completed removing universal links for item ${item.id} on list ${item.__metadata.type}`,
        );
    }

    /**
     * The purpose of this function is to set all permission for a given item to a specified mode flag
     * @param targetList
     * @param targetItemId
     * @param modeFlag
     */
    async updateAllPermissions(
        targetList: string,
        targetItemId: number,
        modeFlag: TModeFlags,
    ) {
        const permissions = await this.getPermissions(targetList, targetItemId);
        for (const permission of permissions) {
            permission.mode_flags = modeFlag;
        }
        await this.updatePermissions(targetList, targetItemId, permissions);
    }

    /**
     *
     * @param listName
     * @param linkedToId
     */
    async abortTasksLinkedToItem(listName: string, linkedToId: number) {
        const tasksToAbort = await this.fetchItemsLinked(
            "Tasks",
            listName,
            linkedToId,
            `status ne 'Completed' and status ne 'Aborted' and status ne 'Failed'`,
        );
        if (tasksToAbort.length > 0) {
            for (const task of tasksToAbort) {
                await this.updateItem(
                    "Tasks",
                    task.id ?? -1,
                    JSON.stringify({ status: "Aborted" }),
                );
            }
        }
    }

    /**
     *
     * @param list
     * @param id
     * @param title
     * @param body
     * @param rapidHelper
     * @returns
     */
    async createErrorNoteOnItem(
        list: string,
        id: number,
        title: string,
        body: string,
        rapidHelper: RAPIDAPIHelper,
    ) {
        console.error(body);
        const note = {
            LinkedItemsToAdd: [`${list}/${id}`],
            title: `Error: ${title}`,
            body,
        };
        return await this.createItem("Notes", JSON.stringify(note));
    }
}
