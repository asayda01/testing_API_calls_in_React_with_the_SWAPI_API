import React from 'react';
import { waitFor, render, screen } from '@testing-library/react';
import App from './App';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import '@testing-library/jest-dom';

const server = setupServer(
  rest.get('https://swapi.dev/api/people/1', (req, res, ctx) => {
    return res(ctx.json({

      "data": [

        {
          "name": "Luke Skywalker",
          "height": "172",
          "mass": "77",
          "hair_color": "blond",
          "skin_color": "fair",
          "eye_color": "blue",
          "birth_year": "19BBY",
          "gender": "male",
          "homeworld": "https://swapi.dev/api/planets/1/",
          "films": [
            "https://swapi.dev/api/films/1/",
            "https://swapi.dev/api/films/2/",
            "https://swapi.dev/api/films/3/",
            "https://swapi.dev/api/films/6/"
          ],
          "species": [],
          "vehicles": [
            "https://swapi.dev/api/vehicles/14/",
            "https://swapi.dev/api/vehicles/30/"
          ],
          "starships": [
            "https://swapi.dev/api/starships/12/",
            "https://swapi.dev/api/starships/22/"
          ],
          "created": "2014-12-09T13:50:51.644000Z",
          "edited": "2014-12-20T21:17:56.891000Z",
          "url": "https://swapi.dev/api/people/1/"
        },

        {
          "name": "Leia Organa",
          "height": "150",
          "mass": "49",
          "hair_color": "brown",
          "skin_color": "light",
          "eye_color": "brown",
          "birth_year": "19BBY",
          "gender": "female",
          "homeworld": "https://swapi.dev/api/planets/2/",
          "films": [
            "https://swapi.dev/api/films/1/",
            "https://swapi.dev/api/films/2/",
            "https://swapi.dev/api/films/3/",
            "https://swapi.dev/api/films/6/"
          ],
          "species": [],
          "vehicles": [
            "https://swapi.dev/api/vehicles/30/"
          ],
          "starships": [],
          "created": "2014-12-10T15:20:09.791000Z",
          "edited": "2014-12-20T21:17:50.315000Z",
          "url": "https://swapi.dev/api/people/5/"
        }

      ]
    }))
  }),
)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())


describe("Testing for Character Attributes",() => {

  test('renders birth year attribute', () => {

    render(<App />);
    const linkElement = screen.getByText(/birth year/i);
    expect(linkElement).toBeInTheDocument();

  }),

  test('renders mass attribute', () => {

    render(<App />);
    const linkElement = screen.getByText(/mass/i);
    expect(linkElement).toBeInTheDocument();

  }),

  test('renders height attribute', () => {

    render(<App />);
    const linkElement = screen.getByText(/height/i);
    expect(linkElement).toBeInTheDocument();

  });

});

describe("Testing for fetching , loading and rendering A Character with attributes",() => {

  test('renders Luke Skywalker', async () => {
    
    render(<App />);
    waitFor(() => expect(screen.getByText(/luke skywalker/i)).toBeInTheDocument());
  }),

  test('renders Luke Skywalker`s Birth Year', async () => {

    render(<App />);
    waitFor(() => expect(screen.getByText(/19BBY/i)).toBeInTheDocument());
  
  }),

  test('renders Luke Skywalker`s Height', async () => {

    render(<App />);
    waitFor(() => expect(screen.getByText("172")).toBeInTheDocument());
  
  });

});


describe("Testing for Server related Issues", () => {

  test('If an API Call status is 500 , throws the Try Again 🤕 Error', async () => {

    server.use( rest.get('https://swapi.dev/api/people/1', (req, res, ctx) => {
      return res( ctx.status (500) )  
   } ) );

    render(<App />);
    const errorElement = await screen.findByText(/Oops... something went wrong, try again 🤕/i);
    expect(errorElement).toBeInTheDocument();

  });

  test('If an API Call status is 418 , throws the Tea Pot 🫖 Error', async () => {

    server.use( rest.get('https://swapi.dev/api/people/1', (req, res, ctx) => {
      return res( ctx.status (418) )  
   } ) );

    render(<App />);
    const errorElement = await screen.findByText(/418 I'm a tea pot 🫖 , silly/i);
    expect(errorElement).toBeInTheDocument();

  });

});