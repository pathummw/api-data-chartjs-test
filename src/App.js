
import { Component } from 'react';
import './App.css';
import { Bar, Line, Pie } from 'react-chartjs-2'

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      country: {},
      leagueList: {}
    };
  }


  async componentDidMount() {
    /* const url = "https://api.randomuser.me/";
    const response = await fetch(url);
    const data = await response.json();
    this.setState({
      person: data.results[0],
      loading: false
    }); */

    const url = "https://api-football-v1.p.rapidapi.com/v2/countries";
    const urlScores = "https://api-football-v1.p.rapidapi.com/v2/topscorers/2";


    fetch(urlScores, {
      "method": "GET",
      "headers": {
        "x-rapidapi-key": "d9ad56e7d3mshf09eb906ca38e7ap162eacjsne5fdd08c2007",
        "x-rapidapi-host": "api-football-v1.p.rapidapi.com"
      }
    })
      .then(response => {
        response.json()
          .then(data => {
            /* this.setState({ country: data.api.countries, loading: false }) */
            this.setState({ leagueList: data.api.topscorers, loading: false })
            console.log(data.api.topscorers)
          }
          )
      })
      .catch(err => {
        console.error(err);
      });


    console.log(!this.status ? '' : this.status)
  }

  render() {

    let goalArray = [];
    let playerArray = [];
    return (
      <div>
        {/* {this.state.loading || !this.state.country ?
          (<div>Loading ... </div>)
          :
          (<div>
            <div>{this.state.country.country}</div>
            <img src={this.state.country.flag} alt="" />

            <div>
              <ul>{this.state.country.map(item => <li> {item.country}
                <hr />
                <img src={item.flag} style={{ height: 40 }} alt="" />
              </li>)
              }
              </ul>
            </div>

          </div>)
        } */}
        {this.state.loading || !this.state.leagueList ?
          (<div>Loading ... </div>)
          :
          (<div>
            <div>{this.state.leagueList.player_name}</div>
            {/* <img src={this.state.country.flag} alt="" /> */}

            <div>
              <ul>{this.state.leagueList.map(item => <li> {item.player_name} {playerArray.push(item.player_name)} {goalArray.push(item.goals.total)}
                <hr />
                {/* <img src={item.flag} style={{ height: 40 }} alt="" /> */}
                {item.goals.total}
              </li>)
              }
              </ul>
            </div>

          </div>)
        }

        <div className="chart-container">

          <Bar
            data={{
              labels: playerArray,
              datasets: [
                {
                  label: '# of goals',
                  /* data: [(goalArray.length) <= 0 ? goalArray : tempArr], */
                  data: (goalArray.length) <= 0 ? goalArray : goalArray,
                  /* [4, 5, 4, 3, 8, 9, 14] */
                  backgroundColor: function (context) {
                    var index = context.dataIndex;
                    var value = context.dataset.data[index];
                    return index % 2 ? 'blue' :
                      'green';
                  }


                }
              ]
            }}
            height={500}
            width={50}
            options={{
              maintainAspectRatio: false,
              scales: {
                yAxes: [
                  {
                    ticks: {
                      beginAtZero: true,
                    }
                  }
                ]
              }
            }}
          />
        </div>


        {console.log(goalArray)}

      </div>
    )
  }

}

export default App;
