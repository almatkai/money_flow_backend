-- Migration: Triggers for Deposit Statistics and Earnings Calculation

-- Trigger function to update user_deposit_statistics on INSERT/UPDATE/DELETE of user_deposit
CREATE OR REPLACE FUNCTION update_user_deposit_statistics()
RETURNS TRIGGER AS $$
DECLARE
  days_held INTEGER;
  yearly_rate DOUBLE PRECISION;
  earnings DOUBLE PRECISION;
BEGIN
  -- Calculate days held
  IF (TG_OP = 'INSERT') THEN
    days_held := COALESCE((CURRENT_DATE - NEW.created_date), 0);
    yearly_rate := NEW.percentage / 100.0;
    earnings := NEW.price * yearly_rate * (days_held / 365.0);
    -- Update statistics
    UPDATE user_deposit_statistics
    SET
      deposits_total = deposits_total + NEW.price,
      deposit_earning = deposit_earning + earnings,
      deposit_total_contributions = deposit_total_contributions + NEW.price,
      updated_at = NOW()
    WHERE user_id = NEW.user_id;
    RETURN NEW;
  ELSIF (TG_OP = 'UPDATE') THEN
    days_held := COALESCE((CURRENT_DATE - NEW.created_date), 0);
    yearly_rate := NEW.percentage / 100.0;
    earnings := NEW.price * yearly_rate * (days_held / 365.0);
    -- For simplicity, recalculate as if new
    UPDATE user_deposit_statistics
    SET
      deposits_total = deposits_total - OLD.price + NEW.price,
      deposit_earning = deposit_earning - (OLD.price * (OLD.percentage / 100.0) * (days_held / 365.0)) + earnings,
      deposit_total_contributions = deposit_total_contributions - OLD.price + NEW.price,
      updated_at = NOW()
    WHERE user_id = NEW.user_id;
    RETURN NEW;
  ELSIF (TG_OP = 'DELETE') THEN
    days_held := COALESCE((CURRENT_DATE - OLD.created_date), 0);
    yearly_rate := OLD.percentage / 100.0;
    earnings := OLD.price * yearly_rate * (days_held / 365.0);
    -- Remove from statistics
    UPDATE user_deposit_statistics
    SET
      deposits_total = deposits_total - OLD.price,
      deposit_earning = deposit_earning - earnings,
      deposit_total_contributions = deposit_total_contributions - OLD.price,
      updated_at = NOW()
    WHERE user_id = OLD.user_id;
    RETURN OLD;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Triggers for user_deposit
CREATE TRIGGER trg_update_deposit_stats_on_insert
AFTER INSERT ON user_deposit
FOR EACH ROW
EXECUTE FUNCTION update_user_deposit_statistics();

CREATE TRIGGER trg_update_deposit_stats_on_update
AFTER UPDATE ON user_deposit
FOR EACH ROW
EXECUTE FUNCTION update_user_deposit_statistics();

CREATE TRIGGER trg_update_deposit_stats_on_delete
AFTER DELETE ON user_deposit
FOR EACH ROW
EXECUTE FUNCTION update_user_deposit_statistics();
