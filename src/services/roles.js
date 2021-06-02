/**
 * Topcoder TaaS Service for Roles
 */

const mockRoles = [
  {
    id: "78c1d981-f235-4a75-97fb-693a26d2a56d",
    name: "Python Engineer",
    description: "Python Engineer Description",
    listOfSkills: [],
    imageUrl: "https://svgur.com/i/XdC.svg",
  },
  {
    id: "bf1011c1-336a-4ec4-aa07-a916d648dbb4",
    name: "Android Developer",
    description: "Android Developer Description",
    listOfSkills: [],
    imageUrl: "http://svgur.com/i/Xe_.svg",
  },
  {
    id: "532433a6-505d-41fe-beb2-815e9b999077",
    name: "SQL Engineer",
    description: "SQL Engineer Description",
    listOfSkills: [],
    imageUrl: "http://svgur.com/i/Xe2.svg",
  },
  {
    id: "3f5ee777-7221-4fe8-ba3a-11cf09077d3f",
    name: ".NET Developer",
    description: ".NET Developer Description",
    listOfSkills: [],
    imageUrl: "http://svgur.com/i/XeW.svg",
  },
  {
    id: "94653ab7-9e48-4ef2-b5c3-cbd720f134ad",
    name: "C# Developer",
    description: "C# Developer Description",
    listOfSkills: [],
    imageUrl: "http://svgur.com/i/XeV.svg",
  },
  {
    id: "b663d69b-fd56-4ab6-8ef6-3560c4ad0be3",
    name: "Angular Developer",
    description: "Angular Developer Description",
    listOfSkills: [],
    imageUrl: "http://svgur.com/i/XeX.svg",
  },
  {
    id: "e1f25908-664f-4956-a069-08017064b4be",
    name: "Ajax Developer",
    description: "Ajax Developer Description",
    listOfSkills: [],
    imageUrl: "http://svgur.com/i/Xeu.svg",
  },
  {
    id: "8d7f43da-d126-4f53-8146-7d874fb44bff",
    name: "API Developer",
    description: "API Developer Description",
    listOfSkills: [],
    imageUrl: "http://svgur.com/i/Xcr.svg",
  },
  {
    id: "98895ea0-f9f8-4abb-ae6b-b00567eafa93",
    name: "Python Engineer",
    description: "Python Engineer Description",
    listOfSkills: [],
    imageUrl: "https://svgur.com/i/XdC.svg",
  },
  {
    id: "212de943-944f-40a1-871a-af384f462644",
    name: "Role FallbackIcon",
    description: "Role for FallbackIcon Description",
    listOfSkills: [],
    imageUrl: "https://svgur.com/i/XdC-nonexisting.svg",
  },
];

/**
 * Mock API request. Returns a list of mock roles.
 */
export function getRoles() {
  return new Promise((resolve) =>
    setTimeout(resolve, 1500, { data: mockRoles })
  );
}

/**
 * Mock API request. Returns a single role.
 */
export function getRoleById(id) {
  return new Promise((resolve) =>
    setTimeout(resolve, 1500, { data: mockRoles.find((r) => r.id === id) })
  );
}
