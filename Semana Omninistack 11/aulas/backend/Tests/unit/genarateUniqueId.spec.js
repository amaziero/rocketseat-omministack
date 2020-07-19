const genarateUniqueId = require('../../src/utils/genarateUniqueId')

describe('Genarate Unique Id for User', () => {
  it('should genarate an unique ID for the user login', () => {
    const id = genarateUniqueId();
    
    expect(id).toHaveLength(8);
  })
})