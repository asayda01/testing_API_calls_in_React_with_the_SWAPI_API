import React from 'react';
import {waitFor , render, screen } from '@testing-library/react';
import App from './App';
import {rest} from 'msw';
import {setupServer} from 'msw/node';


const server = setupServer(
  rest.get('https://swapi.dev/api/people/1`', (req, res, ctx) => {
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
        }
      ] }))
  }),
)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())



test('renders birth year', () => {

  render(<App />);
  const linkElement = screen.getByText(/birth year/i);
  expect(linkElement).toBeInTheDocument();

});


test('renders luke', async () => {

  // Arrange
  render(<App />);

  //Act
  await waitFor(() => screen.findByText(/luke/i));
  const ChracterName = screen.getByText(/luke/i);

  // Assert
  expect(ChracterName).toBeInTheDocument();

});


test('renders luke', async () => {
  
  // Arrange
  render(<App />);

  //Act
  const ChracterName = await waitFor(() => screen.findByText(/luke/i));

  // Assert
  expect(ChracterName).toBeInTheDocument();

});
