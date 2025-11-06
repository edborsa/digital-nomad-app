describe('Jest Setup', () => {
  it('should run a basic test', () => {
    expect(1 + 1).toBe(2);
  });

  it('should check if Jest is working with TypeScript', () => {
    const greeting: string = 'Hello, Jest!';
    expect(greeting).toBe('Hello, Jest!');
  });

  it('should handle arrays correctly', () => {
    const numbers = [1, 2, 3, 4, 5];
    expect(numbers).toHaveLength(5);
    expect(numbers).toContain(3);
  });
});
