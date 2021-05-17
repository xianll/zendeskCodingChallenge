const { getObjId, getSelectedObj, getSelectedKey, getKeys } = require("../src/input");
const { getRelatedDataByOrgId, getSearchResults, getRelatedDataByUserId, sortSearch} = require("../src/data");
const organizationsData = require("../data/organizations.json");
const ticketsData = require("../data/tickets.json");
const usersData = require("../data/users.json");

test("getObjId() returns 0 when Organization is selected", () => {
    return getObjId().then(obj => {
        expect(obj.id).toBe(0);
    });
});

describe("getSelectedObj()", () => {
    it("Returns the tickets object when the id of 1 is given", () => {
        const ticketObj = ticketsData;
        expect(getSelectedObj(1)).toEqual(ticketObj);
    });
});

describe("getKeys()", () => {
    it("Returns the object keys of the given object", () => {
        const userKeys = [
        "_id",
        "url",
        "external_id",
        "name",
        "alias",
        "created_at",
        "active",
        "verified",
        "shared",
        "locale",
        "timezone",
        "last_login_at",
        "email",
        "phone",
        "signature",
        "organization_id",
        "tags",
        "suspended",
        "role"
    ];
        expect(getKeys(usersData)).toEqual(userKeys);
    })
});

test("getSelectedKey() returns 4 when alias is selected", () => {
    const userKeys = [
        "_id",
        "url",
        "external_id",
        "name",
        "alias",
        "created_at"
    ];
    return getSelectedKey(userKeys).then(key => {
        expect(key.id).toBe(4);
    });
});

describe("getRelatedDataByOrgId()", () => {
    it("Returns all associated results with the given org id", () => {
        const selectedKeyValue = "_id";
        const searchTermValue = "101";
        const results = [
            { 
                _id: 101,
                url: 'http://initech.zendesk.com/api/v2/organizations/101.json',
                external_id: '9270ed79-35eb-4a38-a46f-35725197ea8d',
                name: 'Enthaze',
                domain_names: [ 'kage.com', 'ecratic.com', 'endipin.com', 'zentix.com' ],
                created_at: '2016-05-21T11:10:28 -10:00',
                details: 'MegaCorp',
                shared_tickets: false,
                tags: [ 'Fulton', 'West', 'Rodriguez', 'Farley' ] 
            },
            { 
                _id: 'b07a8c20-2ee5-493b-9ebf-f6321b95966e',
                url:
                'http://initech.zendesk.com/api/v2/tickets/b07a8c20-2ee5-493b-9ebf-f6321b95966e.json',
                external_id: 'ca4452fc-b24d-4e06-a752-b15ee3fc42bb',
                created_at: '2016-03-21T11:18:13 -11:00',
                type: 'question',
                subject: 'A Drama in Portugal',
                description:
                'Laborum exercitation officia nulla in. Consequat et commodo fugiat velit magna sunt mollit.',
                priority: 'low',
                status: 'hold',
                submitter_id: 50,
                assignee_id: 17,
                organization_id: 101,
                tags:
                [ 'Ohio',
                'Pennsylvania',
                'American Samoa',
                'Northern Mariana Islands' ],
                has_incidents: true,
                due_at: '2016-08-04T12:30:08 -10:00',
                via: 'web' 
            },
            {   _id: 'c22aaced-7faa-4b5c-99e5-1a209500ff16',
                url:
                'http://initech.zendesk.com/api/v2/tickets/c22aaced-7faa-4b5c-99e5-1a209500ff16.json',
                external_id: 'b17a9d1b-bc80-4262-a387-bb4f4209d7e2',
                created_at: '2016-07-11T08:52:25 -10:00',
                type: 'incident',
                subject: 'A Problem in Ethiopia',
                description:
                'Esse anim nisi nostrud est. Mollit in nisi reprehenderit proident do commodo voluptate veniam voluptate.',
                priority: 'low',
                status: 'hold',
                submitter_id: 55,
                assignee_id: 55,
                organization_id: 101,
                tags: [ 'Minnesota', 'New Jersey', 'Texas', 'Nevada' ],
                has_incidents: true,
                due_at: '2016-08-06T09:22:54 -10:00',
                via: 'web' 
            },
            {   _id: '89255552-e9a2-433b-970a-af194b3a39dd',
                url:
                'http://initech.zendesk.com/api/v2/tickets/89255552-e9a2-433b-970a-af194b3a39dd.json',
                external_id: '385ac1f0-e1e9-4bed-ba06-2f3013d8e914',
                created_at: '2016-01-20T01:23:55 -11:00',
                type: 'task',
                subject: 'A Problem in Turks and Caicos Islands',
                description:
                'Qui ea sit incididunt culpa commodo velit fugiat reprehenderit. Eu quis sint nulla ut veniam irure sunt ad elit proident dolore.',
                priority: 'low',
                status: 'pending',
                submitter_id: 39,
                assignee_id: 52,
                organization_id: 101,
                tags: [ 'Virginia', 'Virgin Islands', 'Maine', 'West Virginia' ],
                has_incidents: false,
                due_at: '2016-08-08T07:24:14 -10:00',
                via: 'web' 
            },
            {   _id: '27c447d9-cfda-4415-9a72-d5aa12942cf1',
                url:
                'http://initech.zendesk.com/api/v2/tickets/27c447d9-cfda-4415-9a72-d5aa12942cf1.json',
                external_id: 'd3516c61-d232-4f64-a0f4-a496d550cd04',
                created_at: '2016-01-31T07:43:00 -11:00',
                type: 'incident',
                subject: 'A Problem in Guyana',
                description:
                'Ex sit ea sit exercitation tempor pariatur et do deserunt irure eiusmod. Exercitation anim consectetur amet anim id.',
                priority: 'normal',
                status: 'closed',
                submitter_id: 67,
                assignee_id: 74,
                organization_id: 101,
                tags:
                [ 'Mississippi', 'Marshall Islands', 'South Dakota', 'Montana' ],
                has_incidents: false,
                due_at: '2016-08-18T10:49:09 -10:00',
                via: 'web' 
            },
            {   _id: 5,
                url: 'http://initech.zendesk.com/api/v2/users/5.json',
                external_id: '29c18801-fb42-433d-8674-f37d63e637df',
                name: 'Loraine Pittman',
                alias: 'Mr Ola',
                created_at: '2016-06-12T08:49:19 -10:00',
                active: true,
                verified: false,
                shared: false,
                locale: 'zh-CN',
                timezone: 'Monaco',
                last_login_at: '2013-07-03T06:59:27 -10:00',
                email: 'olapittman@flotonic.com',
                phone: '9805-292-618',
                signature: "Don't Worry Be Happy!",
                organization_id: 101,
                tags: [ 'Frizzleburg', 'Forestburg', 'Sandston', 'Delco' ],
                suspended: false,
                role: 'admin' 
            },
            {   _id: 23,
                url: 'http://initech.zendesk.com/api/v2/users/23.json',
                external_id: 'e9db9277-af4a-4ca6-99e0-291c8a97623e',
                name: 'Francis Bailey',
                alias: 'Miss Singleton',
                created_at: '2016-03-21T07:12:28 -11:00',
                active: true,
                verified: false,
                shared: false,
                locale: 'en-AU',
                timezone: 'Antarctica',
                last_login_at: '2012-12-01T11:14:01 -11:00',
                email: 'singletonbailey@flotonic.com',
                phone: '9584-582-815',
                signature: "Don't Worry Be Happy!",
                organization_id: 101,
                tags: [ 'Leola', 'Graball', 'Yogaville', 'Tivoli' ],
                suspended: false,
                role: 'agent' 
            },
            {   _id: 27,
                url: 'http://initech.zendesk.com/api/v2/users/27.json',
                external_id: 'ee53ec4a-8ae1-4090-8f27-ce511cc292f7',
                name: 'Haley Farmer',
                alias: 'Miss Lizzie',
                created_at: '2016-03-30T12:48:54 -11:00',
                active: false,
                verified: false,
                shared: false,
                locale: 'en-AU',
                timezone: 'New Zealand',
                last_login_at: '2012-02-27T06:07:01 -11:00',
                email: 'lizziefarmer@flotonic.com',
                phone: '9095-423-318',
                signature: "Don't Worry Be Happy!",
                organization_id: 101,
                tags: [ 'Ticonderoga', 'Wanamie', 'Evergreen', 'Loma' ],
                suspended: false,
                role: 'agent' 
            },
            {   _id: 29,
                url: 'http://initech.zendesk.com/api/v2/users/29.json',
                external_id: '5cf7c032-b3cb-4c87-afa1-57fc9f94e9a1',
                name: 'Herrera Norman',
                alias: 'Mr Vance',
                created_at: '2016-03-17T06:09:57 -11:00',
                active: false,
                verified: false,
                shared: true,
                locale: 'en-AU',
                timezone: 'Zimbabwe',
                last_login_at: '2016-05-17T03:03:05 -10:00',
                email: 'vancenorman@flotonic.com',
                phone: '9444-743-342',
                signature: "Don't Worry Be Happy!",
                organization_id: 101,
                tags: [ 'Tilden', 'Layhill', 'Franklin', 'Allensworth' ],
                suspended: false,
                role: 'end-user' 
            }];
        expect(getRelatedDataByOrgId(selectedKeyValue, searchTermValue)).toEqual(results);
    });
});

describe("getRelatedDataByUserId()", () => {
    it("Returns all associated results with the given user id", () => {
        const selectedKeyValue = "submitter_id";
        const searchTermValue = "71";
        const results = [
            { 
                _id: '1a227508-9f39-427c-8f57-1b72f3fab87c',
                url:
                'http://initech.zendesk.com/api/v2/tickets/1a227508-9f39-427c-8f57-1b72f3fab87c.json',
                external_id: '3e5ca820-cd1f-4a02-a18f-11b18e7bb49a',
                created_at: '2016-04-14T08:32:31 -10:00',
                type: 'incident',
                subject: 'A Catastrophe in Micronesia',
                description:
                'Aliquip excepteur fugiat ex minim ea aute eu labore. Sunt eiusmod esse eu non commodo est veniam consequat.',
                priority: 'low',
                status: 'hold',
                submitter_id: 71,
                assignee_id: 38,
                organization_id: 112,
                tags: [ 'Puerto Rico', 'Idaho', 'Oklahoma', 'Louisiana' ],
                has_incidents: false,
                due_at: '2016-08-15T05:37:32 -10:00',
                via: 'chat' 
            },
            { 
                _id: '62a4326f-7114-499f-9adc-a14e99a7ffb4',
                url:
                'http://initech.zendesk.com/api/v2/tickets/62a4326f-7114-499f-9adc-a14e99a7ffb4.json',
                external_id: 'f88517ba-8ac4-418e-b818-0a33385fa2b8',
                created_at: '2016-07-14T05:53:16 -10:00',
                type: 'task',
                subject: 'A Drama in Wallis and Futuna Islands',
                description:
                'Cillum cupidatat dolore mollit commodo amet labore ad reprehenderit. Lorem veniam pariatur Lorem consectetur ad mollit non cillum sunt veniam consequat.',
                priority: 'urgent',
                status: 'solved',
                submitter_id: 71,
                assignee_id: 57,
                organization_id: 105,
                tags: [ 'Rhode Island', 'Kansas', 'Guam', 'Colorado' ],
                has_incidents: true,
                due_at: '2016-08-22T02:19:02 -10:00',
                via: 'chat' 
            },
            {   
                _id: '27ab7105-e852-42f3-91a3-2d77c7a0c3fc',
                url:
                'http://initech.zendesk.com/api/v2/tickets/27ab7105-e852-42f3-91a3-2d77c7a0c3fc.json',
                external_id: '74e795dd-fb0d-48aa-9c83-f90016ca8243',
                created_at: '2016-02-27T03:26:47 -11:00',
                type: 'task',
                subject: 'A Drama in Australia',
                description:
                'Incididunt laboris fuğiat do nostrud ut irure non elit nisi sint aute ut. In mağna aliquip sint adipisicinğ.',
                priority: 'low',
                status: 'solved',
                submitter_id: 71,
                assignee_id: 7,
                organization_id: 111,
                tags: [ 'Puerto Rico', 'Idaho', 'Oklahoma', 'Louisiana' ],
                has_incidents: true,
                due_at: '2016-08-04T10:15:42 -10:00',
                via: 'voice' 
            },
            { 
                _id: 71,
                url: 'http://initech.zendesk.com/api/v2/users/71.json',
                external_id: 'c972bb41-94aa-4f20-bc93-e63dbfe8d9ca',
                name: 'Prince Hinton',
                alias: 'Miss Dana',
                created_at: '2016-04-18T11:05:43 -10:00',
                active: true,
                verified: false,
                shared: false,
                locale: 'zh-CN',
                timezone: 'Samoa',
                last_login_at: '2013-05-01T01:18:48 -10:00',
                email: 'danahinton@flotonic.com',
                phone: '9064-433-892',
                signature: "Don't Worry Be Happy!",
                organization_id: 121,
                tags: [ 'Davenport', 'Cherokee', 'Summertown', 'Clinton' ],
                suspended: false,
                role: 'agent' 
            }
        ];
        expect(getRelatedDataByUserId(selectedKeyValue, searchTermValue)).toEqual(results);
    });
    it("Returns all associated results with the no given id", () => {
        const selectedKeyValueTwo = "assignee_id";
        const searchTermValueTwo = "";
        const resultsTwo = [
            { 
                _id: 'e68d8bfd-9826-42fd-9692-add445aa7430',
                url:
                'http://initech.zendesk.com/api/v2/tickets/e68d8bfd-9826-42fd-9692-add445aa7430.json',
                external_id: '82c58b0f-9958-4af6-b17c-5c23185ef0f9',
                created_at: '2016-06-30T06:59:04 -10:00',
                type: 'question',
                subject: 'A Catastrophe in Falkland Islands (Malvinas)',
                description:
                'Aute eiusmod nostrud cillum fugiat labore nulla laborum excepteur nostrud eiusmod. Sunt eu irure fugiat nulla cupidatat dolore anim dolore.',
                priority: 'normal',
                status: 'pending',
                submitter_id: 17,
                tags:
                [ 'Georgia', 'Tennessee', 'Mississippi', 'Marshall Islands' ],
                has_incidents: false,
                due_at: '2016-08-13T02:51:04 -10:00',
                via: 'voice' 
            },
            { 
                _id: 'c68cb7d7-b517-4d0b-a826-9605423e78c2',
                url:
                'http://initech.zendesk.com/api/v2/tickets/c68cb7d7-b517-4d0b-a826-9605423e78c2.json',
                external_id: '4050fefa-f86f-4254-8ee3-dee3e534ab12',
                created_at: '2016-03-09T01:39:48 -11:00',
                type: 'task',
                subject: 'A Problem in Western Sahara',
                description:
                'Aute pariatur tempor ut consequat duis adipisicing sit in. Veniam ut incididunt mollit sit sit pariatur ad sit sint ad.',
                priority: 'high',
                status: 'solved',
                submitter_id: 61,
                organization_id: 120,
                tags: [ 'Massachusetts', 'New York', 'Minnesota', 'New Jersey' ],
                has_incidents: false,
                due_at: '2016-08-14T08:16:12 -10:00',
                via: 'chat' 
            },
            {   
                _id: '17951590-6a78-49e8-8e45-1d4326ba49cc',
                url:
                'http://initech.zendesk.com/api/v2/tickets/17951590-6a78-49e8-8e45-1d4326ba49cc.json',
                external_id: 'f77cae39-867c-4890-9696-b4d5c7748fa3',
                created_at: '2016-06-28T03:29:34 -10:00',
                type: 'incident',
                subject: 'A Nuisance in Kenya',
                description:
                'Magna est nostrud commodo sint aliqua labore deserunt. Do est dolore enim duis non culpa fugiat laboris exercitation et.',
                priority: 'normal',
                status: 'open',
                submitter_id: 53,
                organization_id: 118,
                tags:
                [ 'District Of Columbia',
                'Wisconsin',
                'Illinois',
                'Fédératéd Statés Of Micronésia' ],
                has_incidents: true,
                due_at: '2016-08-16T09:10:29 -10:00',
                via: 'chat' 
            },
            {   
                _id: '3ff0599a-fe0f-4f8f-ac31-e2636843bcea',
                url:
                'http://initech.zendesk.com/api/v2/tickets/3ff0599a-fe0f-4f8f-ac31-e2636843bcea.json',
                external_id: 'dfc05543-cdf7-4165-8aab-f3a74b29b544',
                created_at: '2016-05-15T12:59:16 -10:00',
                type: 'question',
                subject: 'A Problem in Antigua and Barbuda',
                description:
                'Velit excepteur in reprehenderit pariatur deserunt enim. Irure incididunt duis sint in tempor in do ad magna ex consectetur enim est.',
                priority: 'low',
                status: 'closed',
                submitter_id: 70,
                organization_id: 102,
                tags:
                [ 'American Samoa',
                'Northern Mariana Islands',
                'Puerto Rico',
                'Idaho' ],
                has_incidents: false,
                due_at: '2016-08-14T08:09:39 -10:00',
                via: 'voice' 
            }
        ];
        expect(getRelatedDataByUserId(selectedKeyValueTwo, searchTermValueTwo)).toEqual(resultsTwo);
    });
});

describe("getSearchResults", () => {
    it("Returns org with the name of Strezzö", () => {
        const data = organizationsData;
        const selectedKeyValue = "name";
        const searchTermValue = "Strezzö";
        const results = [{ 
            _id: 125,
            url: 'http://initech.zendesk.com/api/v2/organizations/125.json',
            external_id: '42a1a845-70cf-40ed-a762-acb27fd606cc',
            name: 'Strezzö',
            domain_names:
            [ 'techtrix.com',
            'teraprene.com',
            'corpulse.com',
            'flotonic.com' ],
            created_at: '2016-02-21T06:11:51 -11:00',
            details: 'MegaCorp',
            shared_tickets: false,
            tags: [ 'Vance', 'Ray', 'Jacobs', 'Frank' ] 
            }];
        expect(getSearchResults(data, selectedKeyValue, searchTermValue)).toEqual(results); 
    });
    it("Returns user with alias of Miss Coffey", () => {
        const data = usersData;
        const selectedKeyValue = "alias";
        const searchTermValue = "Miss Coffey";
        const results = [{ 
            _id: 1,
            url: 'http://initech.zendesk.com/api/v2/users/1.json',
            external_id: '74341f74-9c79-49d5-9611-87ef9b6eb75f',
            name: 'Francisca Rasmussen',
            alias: 'Miss Coffey',
            created_at: '2016-04-15T05:19:46 -10:00',
            active: true,
            verified: true,
            shared: false,
            locale: 'en-AU',
            timezone: 'Sri Lanka',
            last_login_at: '2013-08-04T01:03:27 -10:00',
            email: 'coffeyrasmussen@flotonic.com',
            phone: '8335-422-718',
            signature: "Don't Worry Be Happy!",
            organization_id: 119,
            tags:
             [ 'Springville', 'Sutton', 'Hartsville/Hartley', 'Diaperville' ],
            suspended: true,
            role: 'admin' 
        }];
        expect(getSearchResults(data, selectedKeyValue, searchTermValue)).toEqual(results);
    });
    it("Returns ticket with subject of 'A Problem in Heard and McDonald Islands'", () => {
        const data = ticketsData;
        const selectedKeyValue = "subject";
        const searchTermValue = "A Problem in Heard and McDonald Islands";
        const results = [{ 
            _id: '5aa53572-b31c-4d27-814b-11709ab00259',
            url:
            'http://initech.zendesk.com/api/v2/tickets/5aa53572-b31c-4d27-814b-11709ab00259.json',
            external_id: 'c38e866e-0b2e-4207-a7da-bc4c2cb5eb8f',
            created_at: '2016-02-11T04:46:29 -11:00',
            type: 'question',
            subject: 'A Problem in Heard and McDonald Islands',
            description:
            'Esse culpa pariatur esse ut aliqua aute Lorem voluptate est non pariatur sit non non. Ut Lorem proident cupidatat reprehenderit adipisicing nostrud.',
            priority: 'normal',
            status: 'hold',
            submitter_id: 73,
            assignee_id: 44,
            organization_id: 107,
            tags: [ 'South Carolina', 'Indiana', 'New Mexico', 'Nebraska' ],
            has_incidents: true,
            due_at: '2016-08-23T01:54:35 -10:00',
            via: 'voice' 
        }];
        expect(getSearchResults(data, selectedKeyValue, searchTermValue)).toEqual(results);
    });
    it("Returns tickets with no description property when no input is given", () => {
        const data = ticketsData;
        const selectedKeyValue = "description";
        const searchTermValue = "";
        const results = [{ 
            _id: '4cce7415-ef12-42b6-b7b5-fb00e24f9cc1',
            url:
            'http://initech.zendesk.com/api/v2/tickets/4cce7415-ef12-42b6-b7b5-fb00e24f9cc1.json',
            external_id: 'ef665694-aa3f-4960-b264-0e77c50486cf',
            created_at: '2016-02-25T09:12:47 -11:00',
            type: 'question',
            subject: 'A Nuisance in Ghana',
            priority: 'high',
            status: 'solved',
            submitter_id: 9,
            assignee_id: 48,
            organization_id: 104,
            tags: [ 'Delaware', 'New Hampshire', 'Utah', 'Hawaii' ],
            has_incidents: false,
            due_at: '2016-08-05T10:31:03 -10:00',
            via: 'web' 
        }];
        expect(getSearchResults(data, selectedKeyValue, searchTermValue)).toEqual(results);
    });
});


test("sortSearch() sorts the search and returns the related results using inputs given", () => {
    const dataId = { id: 0, value: 'Organizations' };
    const data = organizationsData;
    const selectedKeyValue = "_id";
    const searchTermValue = ["101"];
    const results = [
        { 
            _id: 101,
            url: 'http://initech.zendesk.com/api/v2/organizations/101.json',
            external_id: '9270ed79-35eb-4a38-a46f-35725197ea8d',
            name: 'Enthaze',
            domain_names: [ 'kage.com', 'ecratic.com', 'endipin.com', 'zentix.com' ],
            created_at: '2016-05-21T11:10:28 -10:00',
            details: 'MegaCorp',
            shared_tickets: false,
            tags: [ 'Fulton', 'West', 'Rodriguez', 'Farley' ] 
        },
        { 
            _id: 'b07a8c20-2ee5-493b-9ebf-f6321b95966e',
            url:
            'http://initech.zendesk.com/api/v2/tickets/b07a8c20-2ee5-493b-9ebf-f6321b95966e.json',
            external_id: 'ca4452fc-b24d-4e06-a752-b15ee3fc42bb',
            created_at: '2016-03-21T11:18:13 -11:00',
            type: 'question',
            subject: 'A Drama in Portugal',
            description:
            'Laborum exercitation officia nulla in. Consequat et commodo fugiat velit magna sunt mollit.',
            priority: 'low',
            status: 'hold',
            submitter_id: 50,
            assignee_id: 17,
            organization_id: 101,
            tags:
            [ 'Ohio',
            'Pennsylvania',
            'American Samoa',
            'Northern Mariana Islands' ],
            has_incidents: true,
            due_at: '2016-08-04T12:30:08 -10:00',
            via: 'web' 
        },
        {   _id: 'c22aaced-7faa-4b5c-99e5-1a209500ff16',
            url:
            'http://initech.zendesk.com/api/v2/tickets/c22aaced-7faa-4b5c-99e5-1a209500ff16.json',
            external_id: 'b17a9d1b-bc80-4262-a387-bb4f4209d7e2',
            created_at: '2016-07-11T08:52:25 -10:00',
            type: 'incident',
            subject: 'A Problem in Ethiopia',
            description:
            'Esse anim nisi nostrud est. Mollit in nisi reprehenderit proident do commodo voluptate veniam voluptate.',
            priority: 'low',
            status: 'hold',
            submitter_id: 55,
            assignee_id: 55,
            organization_id: 101,
            tags: [ 'Minnesota', 'New Jersey', 'Texas', 'Nevada' ],
            has_incidents: true,
            due_at: '2016-08-06T09:22:54 -10:00',
            via: 'web' 
        },
        {   _id: '89255552-e9a2-433b-970a-af194b3a39dd',
            url:
            'http://initech.zendesk.com/api/v2/tickets/89255552-e9a2-433b-970a-af194b3a39dd.json',
            external_id: '385ac1f0-e1e9-4bed-ba06-2f3013d8e914',
            created_at: '2016-01-20T01:23:55 -11:00',
            type: 'task',
            subject: 'A Problem in Turks and Caicos Islands',
            description:
            'Qui ea sit incididunt culpa commodo velit fugiat reprehenderit. Eu quis sint nulla ut veniam irure sunt ad elit proident dolore.',
            priority: 'low',
            status: 'pending',
            submitter_id: 39,
            assignee_id: 52,
            organization_id: 101,
            tags: [ 'Virginia', 'Virgin Islands', 'Maine', 'West Virginia' ],
            has_incidents: false,
            due_at: '2016-08-08T07:24:14 -10:00',
            via: 'web' 
        },
        {   _id: '27c447d9-cfda-4415-9a72-d5aa12942cf1',
            url:
            'http://initech.zendesk.com/api/v2/tickets/27c447d9-cfda-4415-9a72-d5aa12942cf1.json',
            external_id: 'd3516c61-d232-4f64-a0f4-a496d550cd04',
            created_at: '2016-01-31T07:43:00 -11:00',
            type: 'incident',
            subject: 'A Problem in Guyana',
            description:
            'Ex sit ea sit exercitation tempor pariatur et do deserunt irure eiusmod. Exercitation anim consectetur amet anim id.',
            priority: 'normal',
            status: 'closed',
            submitter_id: 67,
            assignee_id: 74,
            organization_id: 101,
            tags:
            [ 'Mississippi', 'Marshall Islands', 'South Dakota', 'Montana' ],
            has_incidents: false,
            due_at: '2016-08-18T10:49:09 -10:00',
            via: 'web' 
        },
        {   _id: 5,
            url: 'http://initech.zendesk.com/api/v2/users/5.json',
            external_id: '29c18801-fb42-433d-8674-f37d63e637df',
            name: 'Loraine Pittman',
            alias: 'Mr Ola',
            created_at: '2016-06-12T08:49:19 -10:00',
            active: true,
            verified: false,
            shared: false,
            locale: 'zh-CN',
            timezone: 'Monaco',
            last_login_at: '2013-07-03T06:59:27 -10:00',
            email: 'olapittman@flotonic.com',
            phone: '9805-292-618',
            signature: "Don't Worry Be Happy!",
            organization_id: 101,
            tags: [ 'Frizzleburg', 'Forestburg', 'Sandston', 'Delco' ],
            suspended: false,
            role: 'admin' 
        },
        {   _id: 23,
            url: 'http://initech.zendesk.com/api/v2/users/23.json',
            external_id: 'e9db9277-af4a-4ca6-99e0-291c8a97623e',
            name: 'Francis Bailey',
            alias: 'Miss Singleton',
            created_at: '2016-03-21T07:12:28 -11:00',
            active: true,
            verified: false,
            shared: false,
            locale: 'en-AU',
            timezone: 'Antarctica',
            last_login_at: '2012-12-01T11:14:01 -11:00',
            email: 'singletonbailey@flotonic.com',
            phone: '9584-582-815',
            signature: "Don't Worry Be Happy!",
            organization_id: 101,
            tags: [ 'Leola', 'Graball', 'Yogaville', 'Tivoli' ],
            suspended: false,
            role: 'agent' 
        },
        {   _id: 27,
            url: 'http://initech.zendesk.com/api/v2/users/27.json',
            external_id: 'ee53ec4a-8ae1-4090-8f27-ce511cc292f7',
            name: 'Haley Farmer',
            alias: 'Miss Lizzie',
            created_at: '2016-03-30T12:48:54 -11:00',
            active: false,
            verified: false,
            shared: false,
            locale: 'en-AU',
            timezone: 'New Zealand',
            last_login_at: '2012-02-27T06:07:01 -11:00',
            email: 'lizziefarmer@flotonic.com',
            phone: '9095-423-318',
            signature: "Don't Worry Be Happy!",
            organization_id: 101,
            tags: [ 'Ticonderoga', 'Wanamie', 'Evergreen', 'Loma' ],
            suspended: false,
            role: 'agent' 
        },
        {   _id: 29,
            url: 'http://initech.zendesk.com/api/v2/users/29.json',
            external_id: '5cf7c032-b3cb-4c87-afa1-57fc9f94e9a1',
            name: 'Herrera Norman',
            alias: 'Mr Vance',
            created_at: '2016-03-17T06:09:57 -11:00',
            active: false,
            verified: false,
            shared: true,
            locale: 'en-AU',
            timezone: 'Zimbabwe',
            last_login_at: '2016-05-17T03:03:05 -10:00',
            email: 'vancenorman@flotonic.com',
            phone: '9444-743-342',
            signature: "Don't Worry Be Happy!",
            organization_id: 101,
            tags: [ 'Tilden', 'Layhill', 'Franklin', 'Allensworth' ],
            suspended: false,
            role: 'end-user' 
        }];
    return sortSearch(dataId, data, selectedKeyValue, searchTermValue).then(obj => {
        expect(obj).toEqual(results);
    });
});

test("Returns error when there are no results", () => {
    const dataId = { id: 0, value: 'Organizations' };
    const data = organizationsData;
    const selectedKeyValue = "_id";
    const searchTermValue = ["1000"];
    const error = "There were no results given the search inputs. Please try again. \n";
    return expect(
        sortSearch(dataId, data, selectedKeyValue, searchTermValue)).rejects.toMatch(
            error
        );
});

test("sortSearch() sorts the search and returns the related results using inputs given", () => {
    const dataId = { id: 2, value: 'Users' };
    const data = usersData;
    const selectedKeyValue = "_id";
    const searchTermValue = ["44"];
    const results = [{ 
        _id: '5aa53572-b31c-4d27-814b-11709ab00259',
        url:
        'http://initech.zendesk.com/api/v2/tickets/5aa53572-b31c-4d27-814b-11709ab00259.json',
        external_id: 'c38e866e-0b2e-4207-a7da-bc4c2cb5eb8f',
        created_at: '2016-02-11T04:46:29 -11:00',
        type: 'question',
        subject: 'A Problem in Heard and McDonald Islands',
        description:
        'Esse culpa pariatur esse ut aliqua aute Lorem voluptate est non pariatur sit non non. Ut Lorem proident cupidatat reprehenderit adipisicing nostrud.',
        priority: 'normal',
        status: 'hold',
        submitter_id: 73,
        assignee_id: 44,
        organization_id: 107,
        tags: [ 'South Carolina', 'Indiana', 'New Mexico', 'Nebraska' ],
        has_incidents: true,
        due_at: '2016-08-23T01:54:35 -10:00',
        via: 'voice' 
    },
    { 
        _id: 'd318011c-5325-4d48-9766-953fd16a44a7',
        url:
        'http://initech.zendesk.com/api/v2/tickets/d318011c-5325-4d48-9766-953fd16a44a7.json',
        external_id: '42d60a9f-d934-4658-b21c-43d32f159152',
        created_at: '2016-04-17T04:24:39 -10:00',
        type: 'problem',
        subject: 'A Problem in Norway',
        description:
        'Sint Lorem dolor ex consequat minim labore voluptate. Ad aliquip ullamco veniam non cupidatat minim ut.',
        priority: 'low',
        status: 'solved',
        submitter_id: 58,
        assignee_id: 44,
        organization_id: 116,
        tags: [ 'Alaska', 'Maryland', 'Iowa', 'North Dakota' ],
        has_incidents: false,
        due_at: '2016-08-01T06:08:22 -10:00',
        via: 'chat' 
    },
    { 
        _id: '3d3fc420-7b04-47a7-ab94-870702a0ac14',
        url:
        'http://initech.zendesk.com/api/v2/tickets/3d3fc420-7b04-47a7-ab94-870702a0ac14.json',
        external_id: 'a91e633a-c7df-425d-8466-100c0d3fd200',
        created_at: '2016-05-09T03:48:10 -10:00',
        type: 'task',
        subject: 'A Catastrophe in Swaziland',
        description:
        'Laborum nulla reprehenderit laborum tempor. Fugiat ad ullamco esse enim sit et eiusmod consectetur non voluptate mollit exercitation voluptate.',
        priority: 'high',
        status: 'hold',
        submitter_id: 44,
        assignee_id: 43,
        organization_id: 108,
        tags: [ 'South Carolina', 'Indiana', 'New Mexico', 'Nebraska' ],
        has_incidents: false,
        due_at: '2016-08-22T08:00:54 -10:00',
        via: 'voice' 
    },
    { 
        _id: '1fafaa2a-a1e9-4158-aeb4-f17e64615300',
        url:
        'http://initech.zendesk.com/api/v2/tickets/1fafaa2a-a1e9-4158-aeb4-f17e64615300.json',
        external_id: 'f6f639a4-a8af-4910-804f-5c3a80252653',
        created_at: '2016-01-15T11:52:49 -11:00',
        type: 'problem',
        subject: 'A Problem in Russian Federation',
        description:
        'Elit exercitation veniam commodo nulla laboris. Dolore occaecat cillum nisi amet in.',
        priority: 'low',
        status: 'solved',
        submitter_id: 44,
        assignee_id: 1,
        organization_id: 115,
        tags:
        [ 'Georgia', 'Tennessee', 'Mississippi', 'Marshall Islands' ],
        has_incidents: true,
        due_at: '2016-08-07T04:10:34 -10:00',
        via: 'voice' 
    },
    { 
        _id: '6ed590ac-e385-46e2-a27a-50628a658168',
        url:
        'http://initech.zendesk.com/api/v2/tickets/6ed590ac-e385-46e2-a27a-50628a658168.json',
        external_id: '0142fe07-2e8d-47ef-8cd8-8508810f13f7',
        created_at: '2016-03-03T05:35:49 -11:00',
        type: 'task',
        subject: 'A Problem in Uzbekistan',
        description:
        'Anim do est ea ex minim voluptate laborum culpa. Irure velit do in proident magna nostrud.',
        priority: 'normal',
        status: 'open',
        submitter_id: 72,
        assignee_id: 44,
        organization_id: 110,
        tags:
        [ 'Illinois',
        'Fédératéd Statés Of Micronésia',
        'Rhode Island',
        'Kansas' ],
        has_incidents: false,
        due_at: '2016-08-22T06:11:46 -10:00',
        via: 'web' 
    },
    { 
        _id: 'ffe688cd-402f-4e37-8597-88b3811bbf46',
        url:
        'http://initech.zendesk.com/api/v2/tickets/ffe688cd-402f-4e37-8597-88b3811bbf46.json',
        external_id: 'a264d753-d2c3-4f50-ba8f-299bf8070f67',
        created_at: '2016-02-03T05:47:00 -11:00',
        type: 'question',
        subject: 'A Problem in Vatican City Ştate (Holy See)',
        description:
        'Ullamco enim id proident cillum tempor fugiat consequat non enim ad. Consectetur nostrud consequat deserunt consequat sit deserunt cillum esse eu ut fugiat.',
        priority: 'urgent',
        status: 'open',
        submitter_id: 44,
        assignee_id: 29,
        organization_id: 104,
        tags:
        [ 'District Of Columbia',
        'Wisconsin',
        'Illinois',
        'Fédératéd Statés Of Micronésia' ],
        has_incidents: false,
        due_at: '2016-08-06T07:28:38 -10:00',
        via: 'web' 
    },
    { 
        _id: 'cc3694e5-ea5f-40a0-9eb7-e12ee2917c8a',
        url:
        'http://initech.zendesk.com/api/v2/tickets/cc3694e5-ea5f-40a0-9eb7-e12ee2917c8a.json',
        external_id: '3e4afbec-ed14-4935-9b55-00ddac578869',
        created_at: '2016-01-13T01:19:45 -11:00',
        type: 'problem',
        subject: 'A Drama in Qatar',
        description:
        'Incididunt amet sunt ut consectetur adipisicing elit magna eiusmod reprehenderit cupidatat anim. Labore tempor aliquip cillum et pariatur.',
        priority: 'high',
        status: 'closed',
        submitter_id: 44,
        assignee_id: 28,
        organization_id: 117,
        tags: [ 'Connecticut', 'Arkansas', 'Missouri', 'Alabama' ],
        has_incidents: true,
        due_at: '2016-08-02T12:18:31 -10:00',
        via: 'chat' 
    },
    { 
        _id: 44,
        url: 'http://initech.zendesk.com/api/v2/users/44.json',
        external_id: 'b5d38224-29c5-4aea-81a4-0da83d0a3f80',
        name: 'John Floyd',
        alias: 'Mr Gonzales',
        created_at: '2016-06-08T10:26:06 -10:00',
        active: false,
        verified: false,
        shared: false,
        locale: 'de-CH',
        timezone: 'Hong Kong',
        last_login_at: '2014-11-04T08:34:49 -11:00',
        email: 'gonzalesfloyd@flotonic.com',
        phone: '9894-382-253',
        signature: "Don't Worry Be Happy!",
        tags: [ 'Dunlo', 'Greer', 'Crown', 'Strong' ],
        suspended: false,
        role: 'end-user' 
    }];
    return sortSearch(dataId, data, selectedKeyValue, searchTermValue).then(obj => {
        expect(obj).toEqual(results);
    });
});