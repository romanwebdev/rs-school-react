import { describe, it, vi } from 'vitest';

vi.mock('next/navigation', async () => {
  const actual = await vi.importActual('next/navigation');

  return {
    ...actual,
    useSearchParams: vi.fn(),
    useRouter: vi.fn(),
  };
});

describe('Home Page', () => {
  it.todo('skip');
  // const mockRouter = {
  //   push: vi.fn(),
  // };

  // beforeEach(() => {
  //   (useRouter as Mock).mockReturnValue(mockRouter);
  // });

  // afterEach(() => {
  //   vi.resetAllMocks();
  // });

  // it('renders Home Page', async () => {
  //   (useGetCharactersQuery as Mock).mockReturnValue({
  //     data: { count: 50, results: [] },
  //     isLoading: false,
  //     isFetching: false,
  //   });
  //   (useSearchParams as Mock).mockReturnValue({
  //     get: vi.fn(),
  //   });

  //   render(
  //     <Provider store={store}>
  //       <Home />
  //     </Provider>
  //   );

  //   const homeElement = screen.getByTestId('home');
  //   expect(homeElement).toBeInTheDocument();
  // });
});
