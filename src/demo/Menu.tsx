import { Component } from 'solid-js';
import Menu from '~/components/Menu';

export default function MenuDemo() {
  return (
    <section>
      <h2>Menu</h2>
      <Menu>
        <Menu.Button>Open Menu</Menu.Button>
        <Menu.Items>
          <MenuItem value={1} />
          <MenuItem value={2} />
          <MenuItem value={3} />
        </Menu.Items>
      </Menu>
    </section>
  );
}

const MenuItem: Component<{ value: number }> = (props) => {
  return (
    <Menu.Item
      as="button"
      onClick={() => console.log(`clicked Item ${props.value}`)}
      disabled={props.value % 2 === 0}
    >
      {`Item ${props.value}`}
    </Menu.Item>
  );
};
