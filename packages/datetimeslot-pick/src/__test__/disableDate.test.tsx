import { describe, expect, it } from 'vitest';
import { renderHook } from '@testing-library/react';

import { DateSlotPickContext } from '../components/context/DateSlotPickContext';
import useDatePicker from '../components/hook/useDatePicker';
import { defaultTimezone } from '../utils/common';

import type { ReactNode } from 'react';

describe("disableDate", () => {
  describe("disableWeekly", () => {
    const wrapper = ({ children }: { children: ReactNode }) => (
      <DateSlotPickContext timezone={defaultTimezone}>
        {children}
      </DateSlotPickContext>
    );
  
    it("disableWeekly: string[] - should match result", () => {
      const mockDisableWeekly = ["1-5"]
      const { result } = renderHook(() => useDatePicker({disableWeekly:mockDisableWeekly}), { wrapper });

      expect(result.current.disableWeeklyDay).toEqual([1,2,3,4,5])
    });

    it("disableWeekly: number[] | string[] - should match result", () => {
      const mockDisableWeekly = ["1-3", 4, 5]
      const { result } = renderHook(() => useDatePicker({disableWeekly:mockDisableWeekly}), { wrapper });

      expect(result.current.disableWeeklyDay).toEqual([1,2,3,4,5])
    });

  });
  describe("disableSpecific", () => {
    const wrapper = ({ children }: { children: ReactNode }) => (
      <DateSlotPickContext timezone={defaultTimezone}>
        {children}
      </DateSlotPickContext>
    );

    it("disableSpecific: string[] - should match result", () => {
      const mockDisableSpecific = ["1-5"]
      const { result } = renderHook(() => useDatePicker({disableSpecific:mockDisableSpecific}), { wrapper });

      expect(result.current.disableSpecificDate).toEqual([1,2,3,4,5])
    });

    it("disableSpecific: number[] | string[] - should match result", () => {
      const mockDisableSpecific = ["1-3", 4, 5]
      const { result } = renderHook(() => useDatePicker({disableSpecific:mockDisableSpecific}), { wrapper });

      expect(result.current.disableSpecificDate).toEqual([1,2,3,4,5])
    });
  })
});