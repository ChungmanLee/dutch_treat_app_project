const config = {
    verbose: true,
    testEnvironment: "jsdom",
    setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
    transformIgnorePatterns: ["/node_modules/(?!(react-bootstrap-tagsinput))"],//making exception for react-bootstrap-tagsinput. transfile
}

module.exports = config