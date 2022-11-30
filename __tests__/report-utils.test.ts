import {
  generateListData,
  getAmount,
  getFilteredItems,
} from "../src/components/report/utils";

const projects = [
  {
    projectId: "bgYhx",
    userIds: ["rahej"],
    rule: "Manual Selection",
    gatewayIds: ["gDJ2s"],
    structure: "Sole proprietorship",
    industry: "IT",
    website: "https://mvpmatch.co/",
    description:
      "Sit amet luctus venenatis lectus magna fringilla urna porttitor.",
    image: "https://mvpmatch.co/images/logo.svg",
    name: "Project 1",
  },
  {
    projectId: "ERdPQ",
    userIds: ["rahej"],
    rule: "Manual Selection",
    gatewayIds: ["WU50G"],
    structure: "Partnership",
    industry: "IT",
    website: "https://mvpmatch.co/",
    description:
      "Sit amet luctus venenatis lectus magna fringilla urna porttitor.",
    image: "https://mvpmatch.co/images/logo.svg",
    name: "Project 2",
  },
];

const gateways = [
  {
    gatewayId: "i6ssp",
    userIds: ["rahej"],
    name: "Gateway 1",
    type: "Stripe",
    apiKey: "sk_test_6eC49HqLyjWDarjtT1zdp7dc",
    secondaryApiKey: "",
    description:
      "Sit amet luctus venenatis lectus magna fringilla urna porttitor.",
  },
  {
    gatewayId: "GzFF8",
    userIds: ["rahej"],
    name: "Gateway 2",
    type: "Stripe",
    apiKey: "sk_test_6eC49HqLyVsDarUjT1zdp2hz",
    secondaryApiKey: "",
    description:
      "Pulvinar elementum integer enim neque volutpat ac tincidunt vitae.",
  },
];

const trans = [
  {
    paymentId: "6149cf567833e57669e60455",
    amount: 10,
    projectId: "ERdPQ",
    gatewayId: "i6ssp",
    userIds: ["rahej"],
    modified: "2021-09-20",
    created: "2021-04-11",
  },
  {
    paymentId: "6149cf56625a7464b7ec345a",
    amount: 10,
    projectId: "bgYhx",
    gatewayId: "GzFF8",
    userIds: ["rahej"],
    modified: "2021-04-17",
    created: "2021-04-21",
  },
  {
    paymentId: "6149cf569fe23c28730355f9",
    amount: 10,
    projectId: "ERdPQ",
    gatewayId: "i6ssp",
    userIds: ["rahej"],
    modified: "2021-04-10",
    created: "2021-05-11",
  },
  {
    paymentId: "6149cf567a88de6c18edd672",
    amount: 10,
    projectId: "ERdPQ",
    gatewayId: "GzFF8",
    userIds: ["rahej"],
    modified: "2021-09-12",
    created: "2021-05-29",
  },
  {
    paymentId: "6149cf56a6d7fb52c9514288",
    amount: 10,
    projectId: "bgYhx",
    gatewayId: "GzFF8",
    userIds: ["rahej"],
    modified: "2021-05-28",
    created: "2021-05-29",
  },
  {
    paymentId: "6149cf56acab8c9214c328ba",
    amount: 10,
    projectId: "bgYhx",
    gatewayId: "GzFF8",
    userIds: ["rahej"],
    modified: "2021-08-09",
    created: "2021-05-06",
  },
  {
    paymentId: "6149cf5659eb162d700d9403",
    amount: 10,
    projectId: "bgYhx",
    gatewayId: "i6ssp",
    userIds: ["rahej"],
    modified: "2021-04-30",
    created: "2021-04-20",
  },
];

describe("test report utils", () => {
  it("gets the correct amount from trans list", async () => {
    expect(getAmount(trans, {})).toBe(70);
    expect(getAmount(trans, { gatewayId: "i6ssp" })).toBe(30);
    expect(getAmount(trans, { gatewayId: "GzFF8" })).toBe(40);
    expect(getAmount(trans, { projectId: "bgYhx" })).toBe(40);
    expect(getAmount(trans, { projectId: "ERdPQ" })).toBe(30);
    expect(getAmount(trans, { projectId: "ERdPQ", gatewayId: "GzFF8" })).toBe(
      10
    );
  });

  it("filters transactions correctly", async () => {
    expect(getFilteredItems(trans, { gatewayId: "i6ssp" })).toEqual([
      trans[0],
      trans[2],
      trans[6],
    ]);
  });
});

describe("test generate list data", () => {
  it("renders only one item if there is ony one selection", async () => {
    expect(
      generateListData({
        data: trans.filter(
          (el) => el.projectId === "bgYhx" && el.gatewayId === "i6ssp"
        ),
        params: {
          projectId: "bgYhx",
          gatewayId: "i6ssp",
          from: "2021-01-01",
          to: "2021-05-30",
        },
        gateways: gateways,
        projects: projects,
      }).length
    ).toBe(1);
  });

  it("renders gateway as the top level lable", async () => {
    expect(
      generateListData({
        data: trans,
        params: {
          projectId: "bgYhx",
          from: "2021-01-01",
          to: "2021-05-30",
        },
        gateways: gateways,
        projects: projects,
      })[0]?.name.includes("Gateway")
    ).toBeTruthy();
  });

  it("renders project as the top level lable", async () => {
    expect(
      generateListData({
        data: trans,
        params: {
          gatewayId: "i6ssp",
          from: "2021-01-01",
          to: "2021-05-30",
        },
        gateways: gateways,
        projects: projects,
      })[0]?.name.includes("Project")
    ).toBeTruthy();

    expect(
      generateListData({
        data: trans,
        params: {
          from: "2021-01-01",
          to: "2021-05-30",
        },
        gateways: gateways,
        projects: projects,
      })[0]?.name.includes("Project")
    ).toBeTruthy();
  });
});
