const sum=require('./sum')
test('add 2 nos',()=>{
    expect(sum(1,2)).toBe(3)
})