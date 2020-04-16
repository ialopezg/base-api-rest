import { Greeter } from '../index';

it('My Greeter', () => {
  const tree = Greeter('John Doe').toString();

  expect(tree).toMatchSnapshot();
});
