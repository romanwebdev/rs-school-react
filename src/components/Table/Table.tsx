import { Component } from 'react';
import { IPerson } from '../../types/person.type';
import styles from './Table.module.css';

type TableProps = {
  data: IPerson[];
  hasError: boolean;
};

type TableState = {
  data: IPerson[];
};

export default class Table extends Component<TableProps, TableState> {
  constructor(props: TableProps) {
    super(props);

    this.state = {
      data: props.data,
    };
  }

  componentDidUpdate(prevProps: TableProps) {
    if (prevProps.hasError !== this.props.hasError) {
      throw Error('An error occurred while rendering the table');
    }

    if (prevProps.data !== this.props.data) {
      this.setState({ data: this.props.data });
    }
  }

  render() {
    return (
      <>
        {this.state.data.length ? (
          <table className={styles.table}>
            <thead>
              <tr>
                <th className={styles.th}>Item Name</th>
                <th className={styles.th}>Item Description</th>
              </tr>
            </thead>
            <tbody>
              {this.state.data.map((person) => (
                <tr key={person.name}>
                  <td className={styles.td}>{person.name}</td>
                  <td className={styles.td}>
                    <p>Birth year: {person.birth_year}</p>
                    <p>Height: {person.height}</p>
                    <p>Eye color: {person.eye_color}</p>
                    <p>Skin color: {person.skin_color}</p>
                    <p>Gender: {person.gender}</p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>Nothing found</p>
        )}
      </>
    );
  }
}
