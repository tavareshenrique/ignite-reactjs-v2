import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Pagination } from './pagination';

const onPageChangeCallback = vi.fn();

describe('Pagination', () => {
  beforeEach(() => {
    onPageChangeCallback.mockClear();
  });

  it('should display the right text amount of pages and result', () => {
    const wrapper = render(
      <Pagination
        pageIndex={0}
        totalCount={200}
        perPage={10}
        onPageChange={() => {}}
      />,
    );

    expect(wrapper.getByText('Página 1 de 20')).toBeInTheDocument();
    expect(wrapper.getByText('Total de 200 item(s)')).toBeInTheDocument();
  });

  it('should be able to navigate to next page', async () => {
    const user = userEvent.setup();

    const wrapper = render(
      <Pagination
        pageIndex={0}
        totalCount={200}
        perPage={10}
        onPageChange={onPageChangeCallback}
      />,
    );

    const nextPageButton = wrapper.getByRole('button', {
      name: /próxima página/i,
    });

    await user.click(nextPageButton);

    expect(onPageChangeCallback).toHaveBeenCalledWith(1);
  });

  it('should be able to navigate to previous page', async () => {
    const user = userEvent.setup();

    const wrapper = render(
      <Pagination
        pageIndex={5}
        totalCount={200}
        perPage={10}
        onPageChange={onPageChangeCallback}
      />,
    );

    const nextPageButton = wrapper.getByRole('button', {
      name: /página anterior/i,
    });

    await user.click(nextPageButton);

    expect(onPageChangeCallback).toHaveBeenCalledWith(4);
  });

  it('should be able to navigate to the first page', async () => {
    const user = userEvent.setup();

    const wrapper = render(
      <Pagination
        pageIndex={5}
        totalCount={200}
        perPage={10}
        onPageChange={onPageChangeCallback}
      />,
    );

    const nextPageButton = wrapper.getByRole('button', {
      name: /primeira página/i,
    });

    await user.click(nextPageButton);

    expect(onPageChangeCallback).toHaveBeenCalledWith(0);
  });

  it('should be able to navigate to the last page', async () => {
    const user = userEvent.setup();

    const wrapper = render(
      <Pagination
        pageIndex={0}
        totalCount={200}
        perPage={10}
        onPageChange={onPageChangeCallback}
      />,
    );

    const nextPageButton = wrapper.getByRole('button', {
      name: /última página/i,
    });

    await user.click(nextPageButton);

    expect(onPageChangeCallback).toHaveBeenCalledWith(19);
  });
});
